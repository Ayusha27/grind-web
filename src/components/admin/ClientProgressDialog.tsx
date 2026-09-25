import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
    Alert, Avatar, Box, Dialog, IconButton, ThemeProvider, Tooltip, Typography,
    createTheme, useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getClientPlan, getClientProgress } from '../../services/progressService';
import type { ProgressData, ProgressDay } from '../../types/progress';
import type { DashboardData } from '../../types/dashboard';

export interface ProgressDialogClient {
    id: number;
    name?: string | null;
    email?: string | null;
    goal?: string | null;
    access_token?: string | null;
}

// ---------------------------------------------------------------------
// Look & feel (light, like the client app)
// ---------------------------------------------------------------------

const C = {
    page: '#f5f5f5',
    card: '#ffffff',
    border: '#ececec',
    text: '#111111',
    muted: '#6b6b6b',
    orange: '#ff8a5c',
    orangeSoft: '#ffd2bf',
    green: '#3fae6a',
    purple: '#8f7ee7',
    blue: '#4a90e2',
    empty: '#ececec',
};

const lightTheme = createTheme({
    palette: { mode: 'light', text: { primary: C.text, secondary: C.muted }, background: { paper: C.page } },
    typography: { fontFamily: '"DM Sans", sans-serif' },
});

// ---------------------------------------------------------------------
// Mini charts
// ---------------------------------------------------------------------

const EmptyChart = ({ text }: { text: string }) => (
    <Box sx={{ height: 64, display: 'flex', alignItems: 'center', color: C.muted, fontSize: 13 }}>{text}</Box>
);

const MiniBars = ({ values, labels, color, format }: {
    values: number[]; labels: string[]; color: string; format: (v: number) => string;
}) => {
    const max = Math.max(...values, 1);
    return (
        <Box sx={{ height: 64, display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
            {values.map((v, i) => (
                <Tooltip key={i} title={`${labels[i]}: ${format(v)}`} placement="top" arrow>
                    <Box sx={{ flex: 1, maxWidth: 28, height: `${Math.max((v / max) * 100, 4)}%`, bgcolor: color, borderRadius: '2px 2px 0 0' }} />
                </Tooltip>
            ))}
        </Box>
    );
};

const MiniLine = ({ values, labels, color, unit }: {
    values: number[]; labels: string[]; color: string; unit: string;
}) => {
    const W = 240, H = 64, PAD = 7;
    const min = Math.min(...values), max = Math.max(...values);
    const span = max - min || 1;
    const pts = values.map((v, i) => ({
        x: values.length === 1 ? W / 2 : PAD + (i * (W - 2 * PAD)) / (values.length - 1),
        // A flat series sits in the middle, like the reference design.
        y: max === min ? H / 2 : PAD + ((max - v) / span) * (H - 2 * PAD),
    }));
    return (
        <Box component="svg" viewBox={`0 0 ${W} ${H}`} sx={{ width: '100%', height: 64, display: 'block', overflow: 'visible' }}>
            <polyline points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
            {pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={4.5} fill="#fff" stroke={color} strokeWidth={2.5}>
                    <title>{`${labels[i] || `Entry ${i + 1}`}: ${values[i]} ${unit}`}</title>
                </circle>
            ))}
        </Box>
    );
};

type Cell = { key: string; color: string; title: string };

const DotGrid = ({ cells, columns }: { cells: Cell[]; columns: number }) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '5px', maxWidth: columns * 24 }}>
        {cells.map((c) => (
            <Tooltip key={c.key} title={c.title} placement="top" arrow>
                <Box sx={{ aspectRatio: '1', borderRadius: '3px', bgcolor: c.color }} />
            </Tooltip>
        ))}
    </Box>
);

// ---------------------------------------------------------------------
// Card + section
// ---------------------------------------------------------------------

const MetricCard = ({ title, subtitle, chart, value, unit, note }: {
    title: string; subtitle: string; chart: ReactNode; value: ReactNode; unit?: string; note?: ReactNode;
}) => (
    <Box sx={{ bgcolor: C.card, borderRadius: 3, p: 2.5, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500, color: C.text, lineHeight: 1.2 }}>{title}</Typography>
        <Typography sx={{ fontSize: 14, color: C.muted, mb: 2.5 }}>{subtitle}</Typography>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pb: 1.5 }}>{chart}</Box>
        <Box sx={{ borderTop: `1px solid ${C.border}`, pt: 1.5, display: 'flex', alignItems: 'baseline', gap: 0.75, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: 24, fontWeight: 500, color: C.text }}>{value}</Typography>
            {unit && <Typography sx={{ fontSize: 15, color: C.muted }}>{unit}</Typography>}
            {note && <Typography sx={{ fontSize: 12, color: C.muted, ml: 'auto' }}>{note}</Typography>}
        </Box>
    </Box>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: C.text, mb: 2 }}>{title}</Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>{children}</Box>
    </Box>
);

const Legend = ({ items }: { items: [string, string][] }) => (
    <Box sx={{ display: 'flex', gap: 1.5, mt: 1.25, flexWrap: 'wrap' }}>
        {items.map(([color, label]) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 11, color: C.muted }}>
                <Box sx={{ width: 9, height: 9, borderRadius: '2px', bgcolor: color }} />{label}
            </Box>
        ))}
    </Box>
);

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

const num = (v: unknown): number | null => {
    const m = String(v ?? '').match(/-?\d+(?:\.\d+)?/);
    return m ? Number(m[0]) : null;
};

const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

const signed = (n: number) => `${n > 0 ? '+' : ''}${fmt(n)}`;

const initials = (name: string) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';

type Session = { month: number; week: number; day: number; dayLabel: string; detail: ProgressDay | undefined };

// ---------------------------------------------------------------------
// Dialog
// ---------------------------------------------------------------------

const ClientProgressDialog = ({ client, onClose }: { client: ProgressDialogClient | null; onClose: () => void }) => {
    const fullScreen = useMediaQuery('(max-width:600px)');
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [plan, setPlan] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!client) return;
        setProgress(null);
        setPlan(null);
        setError('');
        const token = client.access_token?.trim();
        if (!token) {
            setError('This client has no access token, so their progress cannot be loaded.');
            return;
        }

        let cancelled = false;
        setLoading(true);
        // The plan only supplies day names, height and BMI; progress is the essential call.
        Promise.allSettled([getClientProgress(token), getClientPlan(token)]).then(([prog, planRes]) => {
            if (cancelled) return;
            if (prog.status === 'fulfilled' && prog.value.success) {
                setProgress(prog.value.data);
            } else {
                const reason = prog.status === 'rejected' ? prog.reason : null;
                setError(reason?.response?.data?.message || 'Failed to load this client\'s progress.');
            }
            if (planRes.status === 'fulfilled' && planRes.value.success) setPlan(planRes.value.data);
            setLoading(false);
        });
        return () => { cancelled = true; };
    }, [client]);

    // ---- derived --------------------------------------------------------

    const derived = useMemo(() => {
        if (!progress) return null;
        const p = progress.plan;
        const months = Math.max(p?.months ?? 0, Object.keys(progress.months ?? {}).length, 1);
        const weeksPerMonth = Math.max(p?.weeks_per_month ?? 0, 1);

        const planDays = [...(plan?.days ?? [])].sort((a, b) => a.id - b.id);
        const dayIds = planDays.length
            ? planDays.map((d) => d.id)
            : Array.from({ length: Math.max(p?.workouts_per_week ?? 0, 1) }, (_, i) => i + 1);
        const dayLabel = (id: number) => planDays.find((d) => d.id === id)?.label || `Day ${id}`;

        // Every planned session in program order.
        const sessions: Session[] = [];
        for (let m = 1; m <= months; m++) {
            for (let w = 1; w <= weeksPerMonth; w++) {
                for (const d of dayIds) {
                    sessions.push({
                        month: m, week: w, day: d, dayLabel: dayLabel(d),
                        detail: progress.weekly_detail?.[String(m)]?.[String(w)]?.[String(d)],
                    });
                }
            }
        }
        const logged = sessions.filter((s) => s.detail?.logged);
        const last7 = logged.slice(-7);
        const sessionName = (s: Session) => `M${s.month} W${s.week} · ${s.dayLabel}`;

        // "This week" = the week of the most recent logged session.
        const latest = logged[logged.length - 1];
        const thisWeekLogged = latest
            ? logged.filter((s) => s.month === latest.month && s.week === latest.week).length
            : 0;

        const weeks = [];
        for (let m = 1; m <= months; m++) {
            for (let w = 1; w <= weeksPerMonth; w++) {
                const inWeek = sessions.filter((s) => s.month === m && s.week === w);
                const n = inWeek.filter((s) => s.detail?.logged).length;
                weeks.push({ m, w, n, total: inWeek.length });
            }
        }

        const history = (progress.chart?.weights ?? []).map((w, i) => ({
            date: progress.chart?.dates?.[i] ?? '',
            weight: w,
            waist: progress.chart?.waists?.[i],
        }));
        const weights = history.filter((h) => h.weight != null).slice(-7);
        const waists = history.filter((h) => h.waist != null).slice(-7);

        return { months, weeksPerMonth, dayIds, sessions, logged, last7, latest, sessionName, thisWeekLogged, weeks, weights, waists };
    }, [progress, plan]);

    // ---- render ---------------------------------------------------------

    const name = client?.name || plan?.client?.name || 'Client';
    const o = progress?.overall;
    const totalSessions = o?.sessions_total || progress?.plan?.sessions_total || 0;
    const attendancePct = totalSessions ? Math.round(((o?.sessions_logged ?? 0) / totalSessions) * 100) : 0;
    const completedPct = totalSessions ? Math.round(((o?.sessions_completed ?? 0) / totalSessions) * 100) : 0;
    const setsTotal = progress?.sets?.total ?? 0;
    const setsCompleted = progress?.sets?.completed ?? 0;
    const setsPct = setsTotal ? Math.round((setsCompleted / setsTotal) * 100) : 0;
    const startWeight = num(plan?.diet?.current_weight) ?? derived?.weights[0]?.weight ?? null;
    const currentWeight = (progress?.current?.weight as number | null | undefined) ?? derived?.weights.at(-1)?.weight ?? null;

    return (
        <ThemeProvider theme={lightTheme}>
            <Dialog
                open={!!client}
                onClose={onClose}
                fullScreen={fullScreen}
                maxWidth="md"
                fullWidth
                slotProps={{ paper: { sx: { bgcolor: C.page, color: C.text, borderRadius: fullScreen ? 0 : 4, backgroundImage: 'none' } } }}
            >
                {/* Header */}
                <Box sx={{ position: 'sticky', top: 0, zIndex: 2, bgcolor: C.card, borderBottom: `1px solid ${C.border}`, px: { xs: 2, sm: 3 }, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: C.text, width: 44, height: 44 }}>{initials(name)}</Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2 }} noWrap>{name}</Typography>
                        <Typography sx={{ fontSize: 13, color: C.muted }} noWrap>
                            {[client?.email, plan?.plan_name, client?.goal || plan?.client?.goal].filter(Boolean).join(' · ') || 'Progress overview'}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} aria-label="Close"><CloseIcon /></IconButton>
                </Box>

                <Box sx={{ px: { xs: 2, sm: 3 }, py: 3, overflowY: 'auto' }}>
                    {/* The app-wide GlobalLoader covers loading; just hold the space. */}
                    {loading && <Box sx={{ minHeight: 200 }} />}
                    {error && <Alert severity="error">{error}</Alert>}

                    {progress && derived && o && (
                        <>
                            {/* Overall progress: attendance (logged ÷ planned), the Progress page's scoring rule. */}
                            <Box sx={{ bgcolor: C.card, borderRadius: 3, p: { xs: 2, sm: 2.5 }, mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
                                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Overall Progress</Typography>
                                    <Typography sx={{ fontSize: 30, fontWeight: 700, color: C.orange, lineHeight: 1 }}>{attendancePct}%</Typography>
                                </Box>
                                <Tooltip
                                    arrow
                                    placement="top"
                                    title={`${o.sessions_completed} completed · ${Math.max(o.sessions_logged - o.sessions_completed, 0)} partial · ${Math.max(totalSessions - o.sessions_logged, 0)} remaining`}
                                >
                                    <Box
                                        role="progressbar"
                                        aria-label="Overall progress"
                                        aria-valuenow={attendancePct}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        sx={{ height: 16, borderRadius: 8, bgcolor: C.empty, overflow: 'hidden', position: 'relative' }}
                                    >
                                        <Box sx={{ position: 'absolute', inset: 0, width: `${Math.min(attendancePct, 100)}%`, bgcolor: C.orangeSoft, transition: 'width .6s ease' }} />
                                        <Box sx={{ position: 'absolute', inset: 0, width: `${Math.min(completedPct, 100)}%`, bgcolor: C.orange, transition: 'width .6s ease' }} />
                                    </Box>
                                </Tooltip>
                                <Typography sx={{ fontSize: 14, color: C.muted, mt: 1.5 }}>
                                    <b style={{ color: C.text }}>{o.sessions_logged}</b> of {totalSessions} sessions logged · <b style={{ color: C.text }}>{o.sessions_completed}</b> completed · <b style={{ color: C.text }}>{fmt(o.calories_burned)}</b> kcal burned
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
                                    <Typography sx={{ fontSize: 13, color: C.muted }}>
                                        {derived.latest
                                            ? `Month ${derived.latest.month} of ${derived.months} · Week ${derived.latest.week}`
                                            : `Not started · ${derived.months}-month program`}
                                    </Typography>
                                    <Legend items={[[C.orange, 'Completed'], [C.orangeSoft, 'Logged, not finished'], [C.empty, 'Remaining']]} />
                                </Box>
                            </Box>

                            <Section title="Insights & Analytics">
                                <MetricCard
                                    title="Workouts"
                                    subtitle="Completion, last 7 sessions"
                                    chart={derived.last7.length
                                        ? <MiniBars values={derived.last7.map((s) => s.detail?.completion_percent ?? 0)} labels={derived.last7.map(derived.sessionName)} color={C.orange} format={(v) => `${v}% complete`} />
                                        : <EmptyChart text="No sessions logged yet" />}
                                    value={o.sessions_completed}
                                    unit={`/ ${totalSessions} days completed`}
                                    note={`${completedPct}%`}
                                />
                                <MetricCard
                                    title="Calories Burned"
                                    subtitle="Last 7 sessions"
                                    chart={derived.last7.length
                                        ? <MiniBars values={derived.last7.map((s) => s.detail?.calories_burned ?? 0)} labels={derived.last7.map(derived.sessionName)} color={C.orange} format={(v) => `${fmt(v)} kcal`} />
                                        : <EmptyChart text="No sessions logged yet" />}
                                    value={fmt(o.calories_burned)}
                                    unit="kcal overall"
                                    note={`avg ${fmt(o.avg_calories_per_session)} / session`}
                                />
                                <MetricCard
                                    title="Weight Trend"
                                    subtitle={`Last ${derived.weights.length || 7} entries`}
                                    chart={derived.weights.length
                                        ? <MiniLine values={derived.weights.map((h) => h.weight as number)} labels={derived.weights.map((h) => h.date)} color={C.purple} unit="kg" />
                                        : <EmptyChart text="No weigh-ins recorded" />}
                                    value={currentWeight != null ? fmt(currentWeight) : '---'}
                                    unit="kg"
                                    note={startWeight != null && currentWeight != null ? `${signed(currentWeight - startWeight)} kg since start` : undefined}
                                />
                                <MetricCard
                                    title="Sets"
                                    subtitle="Sets done, last 7 sessions"
                                    chart={derived.last7.length
                                        ? <MiniBars values={derived.last7.map((s) => s.detail?.completed_sets ?? 0)} labels={derived.last7.map((s) => `${derived.sessionName(s)} (of ${s.detail?.total_sets ?? 0})`)} color={C.orange} format={(v) => `${v} sets`} />
                                        : <EmptyChart text="No sessions logged yet" />}
                                    value={setsCompleted}
                                    unit={`/ ${setsTotal} sets`}
                                    note={`${setsPct}%`}
                                />
                            </Section>

                            <Section title="Habits">
                                <MetricCard
                                    title="Workouts"
                                    subtitle={`All ${derived.sessions.length} planned sessions`}
                                    chart={
                                        <Box>
                                            <DotGrid
                                                columns={Math.min(derived.dayIds.length * 2, 10)}
                                                cells={derived.sessions.map((s) => ({
                                                    key: `${s.month}-${s.week}-${s.day}`,
                                                    color: s.detail?.completed ? C.orange : s.detail?.logged ? C.orangeSoft : C.empty,
                                                    title: `${derived.sessionName(s)} — ${s.detail?.completed ? 'completed' : s.detail?.logged ? `${s.detail.completion_percent}% done` : 'not logged'}`,
                                                }))}
                                            />
                                            <Legend items={[[C.orange, 'Completed'], [C.orangeSoft, 'Partial'], [C.empty, 'Not logged']]} />
                                        </Box>
                                    }
                                    value={`${derived.thisWeekLogged}/${derived.dayIds.length}`}
                                    unit="latest week"
                                />
                                <MetricCard
                                    title="Active Weeks"
                                    subtitle={`${derived.weeks.length} program weeks`}
                                    chart={
                                        <Box>
                                            <DotGrid
                                                columns={derived.weeksPerMonth}
                                                cells={derived.weeks.map((w) => ({
                                                    key: `${w.m}-${w.w}`,
                                                    color: w.n === 0 ? C.empty : w.n >= w.total ? C.green : '#a6dcb9',
                                                    title: `Month ${w.m}, Week ${w.w}: ${w.n}/${w.total} sessions (${w.total ? Math.round((w.n / w.total) * 100) : 0}%)`,
                                                }))}
                                            />
                                            <Legend items={[[C.green, 'Full week'], ['#a6dcb9', 'Partial'], [C.empty, 'Missed']]} />
                                        </Box>
                                    }
                                    value={o.active_weeks}
                                    unit="active weeks"
                                    note={`best week ${o.best_week_score}%`}
                                />
                            </Section>

                            <Section title="Monthly Breakdown">
                                {Array.from({ length: derived.months }, (_, i) => i + 1).map((m) => {
                                    const md = progress.months?.[String(m)];
                                    const logged = md?.sessions_logged ?? 0;
                                    const total = md?.sessions_total || progress.plan?.sessions_per_month || 0;
                                    const score = total ? Math.round((logged / total) * 100) : 0;
                                    const isCurrent = progress.month?.month_no === m;
                                    return (
                                        <MetricCard
                                            key={m}
                                            title={`Month ${m}`}
                                            subtitle={isCurrent ? 'Current month' : md && logged ? 'Tracked' : 'Not started'}
                                            chart={
                                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 1.25, columnGap: 2 }}>
                                                    {[
                                                        ['Sessions', `${logged} / ${total}`],
                                                        ['Completed', `${md?.sessions_completed ?? 0}`],
                                                        ['Sets', `${md?.sets_completed ?? 0} / ${md?.sets_total ?? 0}`],
                                                        ['Calories', `${fmt(md?.calories_burned ?? 0)} kcal`],
                                                        ['Avg / session', `${fmt(md?.avg_calories_per_session ?? 0)} kcal`],
                                                        ['Active weeks', `${md?.active_weeks ?? 0} / ${progress.plan?.weeks_per_month ?? 4}`],
                                                    ].map(([k, v]) => (
                                                        <Box key={k}>
                                                            <Typography sx={{ fontSize: 12, color: C.muted }}>{k}</Typography>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>{v}</Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            }
                                            value={`${score}%`}
                                            unit="month score"
                                            note={`best week ${md?.best_week_score ?? 0}%`}
                                        />
                                    );
                                })}
                            </Section>

                            <Section title="Body Metrics">
                                <MetricCard
                                    title="Scale Weight"
                                    subtitle={`Last ${derived.weights.length || 7} entries`}
                                    chart={derived.weights.length
                                        ? <MiniLine values={derived.weights.map((h) => h.weight as number)} labels={derived.weights.map((h) => h.date)} color={C.green} unit="kg" />
                                        : <EmptyChart text="No weigh-ins recorded" />}
                                    value={currentWeight != null ? fmt(currentWeight) : '---'}
                                    unit="kg"
                                    note={progress.transformation?.weight_lost ? `${fmt(progress.transformation.weight_lost)} kg lost` : undefined}
                                />
                                <MetricCard
                                    title="Waist"
                                    subtitle={`Last ${derived.waists.length || 7} entries`}
                                    chart={derived.waists.length
                                        ? <MiniLine values={derived.waists.map((h) => h.waist as number)} labels={derived.waists.map((h) => h.date)} color={C.blue} unit="" />
                                        : <EmptyChart text="No measurements recorded" />}
                                    value={progress.current?.waist != null ? fmt(progress.current.waist as number) : '---'}
                                    unit="waist"
                                    note={progress.transformation?.waist_reduced ? `${fmt(progress.transformation.waist_reduced)} reduced` : undefined}
                                />
                                <Box sx={{ gridColumn: '1 / -1', bgcolor: C.card, borderRadius: 3, p: 2.5, display: 'grid', gap: 2, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' } }}>
                                    {[
                                        ['Starting weight', startWeight != null ? `${fmt(startWeight)} kg` : '---'],
                                        ['Height', plan?.diet?.height || '---'],
                                        ['BMI', plan?.diet?.bmi ? `${plan.diet.bmi}${plan.diet.bmi_status ? ` (${plan.diet.bmi_status})` : ''}` : '---'],
                                        ['Chest', progress.current?.chest != null ? fmt(progress.current.chest as number) : '---'],
                                        ['Arms', progress.current?.arms != null ? fmt(progress.current.arms as number) : '---'],
                                        ['Thighs', progress.current?.thighs != null ? fmt(progress.current.thighs as number) : '---'],
                                    ].map(([k, v]) => (
                                        <Box key={k}>
                                            <Typography sx={{ fontSize: 12, color: C.muted }}>{k}</Typography>
                                            <Typography sx={{ fontSize: 17, fontWeight: 500 }}>{v}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Section>
                        </>
                    )}
                </Box>
            </Dialog>
        </ThemeProvider>
    );
};

export default ClientProgressDialog;
