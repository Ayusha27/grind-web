import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Alert, Avatar, Box, Button, ButtonBase, CircularProgress, IconButton, Menu, MenuItem,
    Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    ThemeProvider, Tooltip, Typography, createTheme,
} from '@mui/material';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LinkIcon from '@mui/icons-material/Link';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import {
    getAffiliateDetail, getAffiliates,
    type AffiliateDetailResponse, type AffiliateReferral, type AffiliateSummaryRow,
} from '../../../services/affiliateService';

// ---------------------------------------------------------------------
// Look & feel
// ---------------------------------------------------------------------

const C = {
    page: '#f4f5f7',
    card: '#ffffff',
    border: '#eceef2',
    text: '#111827',
    muted: '#6b7280',
    orange: '#f7a928',
    orangeDark: '#ef8a12',
    orangeLight: '#fcd08a',
    orangeTint: '#fff4e0',
    green: '#16a34a',
    red: '#dc2626',
    blue: '#2563eb',
};

// The admin shell is dark; this page is light, so it gets its own theme for
// inputs, menus, tables and the snackbar.
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: C.orangeDark, contrastText: '#fff' },
        text: { primary: C.text, secondary: C.muted },
        background: { default: C.page, paper: C.card },
        divider: C.border,
    },
    typography: { fontFamily: '"DM Sans", sans-serif' },
    shape: { borderRadius: 10 },
});

const cardSx = {
    bgcolor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 3,
    boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04)',
};

// ---------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------

/** The API returns MySQL "YYYY-MM-DD[ HH:MM:SS]" strings; read them as local time. */
const parseDbDate = (value: string | null): Date | null => {
    if (!value) return null;
    const d = new Date(value.length === 10 ? `${value}T00:00:00` : value.replace(' ', 'T'));
    return Number.isNaN(d.getTime()) ? null : d;
};

const fmtDate = (d: Date | null) =>
    d ? d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const inr = (n: number) => `₹ ${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

const inrShort = (n: number) => {
    if (n >= 100000) return `₹ ${+(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹ ${+(n / 1000).toFixed(1)}K`;
    return `₹ ${n}`;
};

const initials = (name: string) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Round an axis maximum up to 1/2/2.5/5 × 10ⁿ so it splits into four tidy ticks. */
const niceScale = (max: number) => {
    if (max <= 0) return { top: 4000, ticks: [0, 1000, 2000, 3000, 4000] };
    const raw = max / 4;
    const mag = 10 ** Math.floor(Math.log10(raw));
    const norm = raw / mag;
    const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
    const top = step * Math.ceil(max / step);
    const ticks: number[] = [];
    for (let t = 0; t <= top + step / 2; t += step) ticks.push(t);
    return { top, ticks };
};

/** Percent change, or "New" when the previous period had nothing. */
const change = (current: number, previous: number): { up: boolean; label: string } | null => {
    if (previous === 0) return current > 0 ? { up: true, label: 'New' } : null;
    const pct = Math.round(((current - previous) / previous) * 100);
    return { up: pct >= 0, label: `${Math.abs(pct)}%` };
};

// ---------------------------------------------------------------------
// Bar chart
// ---------------------------------------------------------------------

type Bar = { key: string; label: string; tooltip: string; value: number; color: string };

const BarChart = ({ bars, height = 180, showValues = false }: { bars: Bar[]; height?: number; showValues?: boolean }) => {
    const [hover, setHover] = useState<number | null>(null);
    const { top, ticks } = niceScale(Math.max(0, ...bars.map((b) => b.value)));

    return (
        <Box sx={{ display: 'flex', pt: showValues ? 3 : 1 }}>
            <Box sx={{ position: 'relative', width: 52, height, flexShrink: 0 }}>
                {ticks.map((t) => (
                    <Typography
                        key={t}
                        sx={{
                            position: 'absolute', right: 10, bottom: `${(t / top) * 100}%`,
                            transform: 'translateY(50%)', fontSize: 11, color: C.muted, whiteSpace: 'nowrap',
                        }}
                    >
                        {t === 0 ? '0' : inrShort(t)}
                    </Typography>
                ))}
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ position: 'relative', height, borderLeft: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
                    {ticks.filter((t) => t > 0).map((t) => (
                        <Box key={t} sx={{ position: 'absolute', left: 0, right: 0, bottom: `${(t / top) * 100}%`, borderTop: `1px dashed ${C.border}` }} />
                    ))}

                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', px: 1 }}>
                        {bars.map((b, i) => (
                            <Box
                                key={b.key}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(null)}
                                sx={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative', width: '62%', maxWidth: 72,
                                        height: `${(b.value / top) * 100}%`, minHeight: b.value > 0 ? 3 : 0,
                                        bgcolor: b.color, borderRadius: '4px 4px 0 0',
                                        transition: 'height .4s ease, filter .15s', filter: hover === i ? 'brightness(0.95)' : 'none',
                                    }}
                                >
                                    {showValues && (
                                        <Typography sx={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)', fontSize: 12, fontWeight: 600, color: C.text, whiteSpace: 'nowrap' }}>
                                            {inr(b.value)}
                                        </Typography>
                                    )}
                                    {!showValues && hover === i && (
                                        <Box sx={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', bgcolor: '#1f2330', color: '#fff', px: 1.25, py: 0.75, borderRadius: 1.5, zIndex: 2, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                                            <Typography sx={{ fontSize: 11, opacity: 0.8 }}>{b.tooltip}</Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{inr(b.value)}</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', px: 1, mt: 1 }}>
                    {bars.map((b) => (
                        <Typography key={b.key} sx={{ flex: 1, textAlign: 'center', fontSize: 12, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                            {b.label}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

// ---------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------

const CardTitle = ({ children, icon }: { children: ReactNode; icon?: ReactNode }) => (
    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 19, fontWeight: 700, color: C.text }}>
        {icon}{children}
    </Typography>
);

const LabelledRow = ({ icon, label, value }: { icon: ReactNode; label?: string; value: ReactNode }) => (
    <Box sx={{ display: 'flex', alignItems: label ? 'flex-start' : 'center', gap: 1.5 }}>
        <Box sx={{ color: C.muted, display: 'flex', mt: label ? 0.25 : 0 }}>{icon}</Box>
        <Box sx={{ minWidth: 0 }}>
            {label && <Typography sx={{ fontSize: 13, color: C.muted }}>{label}</Typography>}
            <Box sx={{ fontSize: label ? 15 : 14, color: label ? C.text : C.muted, fontWeight: label ? 500 : 400, wordBreak: 'break-word' }}>{value}</Box>
        </Box>
    </Box>
);

const StatCard = ({ icon, iconBg, iconColor, label, value, delta, deltaCaption }: {
    icon: ReactNode; iconBg: string; iconColor: string; label: string; value: string;
    delta: { up: boolean; label: string } | null; deltaCaption: string;
}) => (
    <Box sx={{ ...cardSx, p: 2.5, display: 'flex', gap: 2.5 }}>
        <Box sx={{ width: 56, height: 56, borderRadius: 2.5, bgcolor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {icon}
        </Box>
        <Box>
            <Typography sx={{ fontSize: 14, color: C.muted }}>{label}</Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 700, color: C.text, lineHeight: 1.25 }}>{value}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                {delta ? (
                    <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: delta.up ? C.green : C.red }}>
                        {delta.up ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
                        {delta.label}
                    </Typography>
                ) : (
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: C.muted }}>—</Typography>
                )}
                <Typography sx={{ fontSize: 14, color: C.muted }}>{deltaCaption}</Typography>
            </Box>
        </Box>
    </Box>
);

const StatusChip = ({ status }: { status: string | null }) => {
    const s = (status || 'Unknown').toLowerCase();
    const [fg, bg] =
        s === 'paid' ? [C.green, '#e8f7ee']
            : s === 'failed' ? [C.red, '#fdecec']
                : s === 'processing' ? [C.blue, '#e8f0fe']
                    : [C.orangeDark, C.orangeTint];
    return (
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 0.4, borderRadius: 1.5, bgcolor: bg, color: fg, fontSize: 13, fontWeight: 500 }}>
            <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: fg }} />
            {status || 'Unknown'}
        </Box>
    );
};

// ---------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------

const PREVIEW_ROWS = 5;

const AffiliateDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [affiliates, setAffiliates] = useState<AffiliateSummaryRow[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [listError, setListError] = useState('');

    const [detail, setDetail] = useState<AffiliateDetailResponse | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState('');

    const [period, setPeriod] = useState<'monthly' | 'weekly'>('monthly');
    const [year, setYear] = useState(new Date().getFullYear());
    const [showAll, setShowAll] = useState(false);

    const [switcherAnchor, setSwitcherAnchor] = useState<HTMLElement | null>(null);
    const [rowMenu, setRowMenu] = useState<{ anchor: HTMLElement; referral: AffiliateReferral } | null>(null);
    const [toast, setToast] = useState('');

    const selectedId = Number(searchParams.get('id')) || affiliates[0]?.id || null;

    useEffect(() => {
        getAffiliates()
            .then((res) => setAffiliates(res.affiliates ?? []))
            .catch((err) => setListError(err.response?.data?.message || err.response?.data?.detail || 'Failed to load affiliates'))
            .finally(() => setListLoading(false));
    }, []);

    useEffect(() => {
        if (!selectedId) return;
        let cancelled = false;
        setDetailLoading(true);
        setDetailError('');
        setShowAll(false);
        getAffiliateDetail(selectedId)
            .then((res) => { if (!cancelled) setDetail(res); })
            .catch((err) => {
                if (cancelled) return;
                setDetail(null);
                setDetailError(err.response?.data?.message || err.response?.data?.detail || 'Failed to load affiliate details');
            })
            .finally(() => { if (!cancelled) setDetailLoading(false); });
        return () => { cancelled = true; };
    }, [selectedId]);

    const copy = useCallback(async (text: string, what: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setToast(`${what} copied`);
        } catch {
            setToast('Could not access the clipboard');
        }
    }, []);

    // ---- derived data --------------------------------------------------

    const referrals = useMemo(
        () => (detail?.referrals ?? []).map((r) => ({ ...r, date: parseDbDate(r.created_at) })),
        [detail],
    );
    // Commission is only earned on paid enrollments (same rule as the backend totals).
    const paid = useMemo(() => referrals.filter((r) => r.payment_status === 'Paid' && r.date), [referrals]);

    const stats = useMemo(() => {
        const now = new Date();
        const monthIdx = (d: Date) => d.getFullYear() * 12 + d.getMonth();
        const quarterIdx = (d: Date) => d.getFullYear() * 4 + Math.floor(d.getMonth() / 3);
        const thisMonth = monthIdx(now);
        const thisQuarter = quarterIdx(now);

        const countIn = (m: number) => referrals.filter((r) => r.date && monthIdx(r.date) === m).length;
        const earnedIn = (q: number) => paid.filter((r) => quarterIdx(r.date!) === q).reduce((s, r) => s + r.commission, 0);

        return {
            referralsDelta: change(countIn(thisMonth), countIn(thisMonth - 1)),
            earningsDelta: change(earnedIn(thisQuarter), earnedIn(thisQuarter - 1)),
        };
    }, [referrals, paid]);

    const overviewBars = useMemo<Bar[]>(() => {
        const now = new Date();
        if (period === 'monthly') {
            return Array.from({ length: 12 }, (_, i) => {
                const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
                const value = paid
                    .filter((r) => r.date!.getFullYear() === d.getFullYear() && r.date!.getMonth() === d.getMonth())
                    .reduce((s, r) => s + r.commission, 0);
                return {
                    key: `${d.getFullYear()}-${d.getMonth()}`,
                    label: MONTHS[d.getMonth()],
                    tooltip: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
                    value,
                    color: i === 11 ? C.orangeLight : C.orange,
                };
            });
        }
        // Weekly: the last 12 Monday-to-Sunday weeks, ending with the current one.
        const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
        return Array.from({ length: 12 }, (_, i) => {
            const start = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() - (11 - i) * 7);
            const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
            const value = paid.filter((r) => r.date! >= start && r.date! < end).reduce((s, r) => s + r.commission, 0);
            const label = `${start.getDate()} ${MONTHS[start.getMonth()]}`;
            return { key: start.toISOString(), label, tooltip: `Week of ${label}`, value, color: i === 11 ? C.orangeLight : C.orange };
        });
    }, [paid, period]);

    const years = useMemo(() => {
        const set = new Set<number>([new Date().getFullYear()]);
        referrals.forEach((r) => r.date && set.add(r.date.getFullYear()));
        return [...set].sort((a, b) => b - a);
    }, [referrals]);

    const quarterBars = useMemo<Bar[]>(() => {
        const sums = [0, 0, 0, 0];
        paid.filter((r) => r.date!.getFullYear() === year).forEach((r) => {
            sums[Math.floor(r.date!.getMonth() / 3)] += r.commission;
        });
        const max = Math.max(...sums);
        return sums.map((value, q) => ({
            key: `Q${q + 1}`,
            label: `Q${q + 1} ${year}`,
            tooltip: `Q${q + 1} ${year}`,
            value,
            color: max > 0 && value === max ? C.orangeDark : '#fbbf4a',
        }));
    }, [paid, year]);

    // ---- render --------------------------------------------------------

    const shell = (children: ReactNode) => (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    m: { xs: -2, md: -4 },
                    p: { xs: 2, md: 3.5 },
                    bgcolor: C.page,
                    color: C.text,
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                {children}
            </Box>
        </ThemeProvider>
    );

    if (listLoading) {
        return shell(<Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>);
    }
    if (listError) return shell(<Alert severity="error">{listError}</Alert>);
    if (!affiliates.length) {
        return shell(
            <Box sx={{ ...cardSx, p: 6, textAlign: 'center' }}>
                <Typography sx={{ fontSize: 20, fontWeight: 700 }}>No affiliates yet</Typography>
                <Typography sx={{ color: C.muted, mt: 1 }}>Affiliate coupon codes will appear here once they are created.</Typography>
            </Box>,
        );
    }

    const aff = detail?.affiliate;
    const name = aff?.affiliate_name || affiliates.find((a) => a.id === selectedId)?.affiliate_name || 'Affiliate';
    const code = aff?.code || '';
    const isActive = (aff?.status || '').toLowerCase() === 'active';
    const expiry = parseDbDate(aff?.expiry_date ?? null);
    const expired = !!expiry && expiry < new Date(new Date().toDateString());
    const link = code ? `${window.location.origin}${import.meta.env.BASE_URL}client/enrollment?ref=${encodeURIComponent(code)}` : '';
    const shareText = `Get ${aff?.discount_percent ?? 0}% off your GRIND fitness plan with my code ${code}:`;
    const visibleReferrals = showAll ? referrals : referrals.slice(0, PREVIEW_ROWS);

    const openShare = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
    const shareLink = async () => {
        if (navigator.share) {
            try { await navigator.share({ title: 'GRIND', text: shareText, url: link }); } catch { /* dismissed */ }
        } else {
            copy(link, 'Affiliate link');
        }
    };

    const quickShare = [
        { label: 'WhatsApp', icon: <WhatsAppIcon />, bg: '#25d366', onClick: () => openShare(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${link}`)}`) },
        { label: 'Facebook', icon: <FacebookIcon />, bg: '#1877f2', onClick: () => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`) },
        {
            label: 'Instagram (copies link)', icon: <InstagramIcon />, bg: 'linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)',
            onClick: () => { copy(link, 'Affiliate link'); openShare('https://www.instagram.com/'); },
        },
        { label: 'LinkedIn', icon: <LinkedInIcon />, bg: '#0a66c2', onClick: () => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`) },
        { label: 'X', icon: <XIcon sx={{ fontSize: 20 }} />, bg: '#000', onClick: () => openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(link)}`) },
        { label: 'Copy link', icon: <LinkIcon sx={{ fontSize: 22 }} />, bg: '#e5e7eb', fg: C.text, onClick: () => copy(link, 'Affiliate link') },
    ];

    return shell(
        <>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Box>
                    <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
                        Welcome, {name} 👋
                    </Typography>
                    <Typography sx={{ fontSize: 16, color: C.muted, mt: 0.5 }}>
                        Track referrals, earnings and impact — all in one place.
                    </Typography>
                </Box>

                <ButtonBase
                    onClick={(e) => setSwitcherAnchor(e.currentTarget)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1, py: 0.5, borderRadius: 2, '&:hover': { bgcolor: '#eceef2' } }}
                >
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#1f2330', fontSize: 15 }}>{initials(name)}</Avatar>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: 11, color: C.muted, lineHeight: 1 }}>Viewing affiliate</Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 500, color: C.text }}>{name}</Typography>
                    </Box>
                    <KeyboardArrowDownIcon sx={{ color: C.muted }} />
                </ButtonBase>
                <Menu
                    anchorEl={switcherAnchor}
                    open={!!switcherAnchor}
                    onClose={() => setSwitcherAnchor(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    slotProps={{ paper: { sx: { maxHeight: 420, minWidth: 260 } } }}
                >
                    {affiliates.map((a) => (
                        <MenuItem
                            key={a.id}
                            selected={a.id === selectedId}
                            onClick={() => { setSearchParams({ id: String(a.id) }); setSwitcherAnchor(null); }}
                            sx={{ gap: 1.5 }}
                        >
                            <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: '#1f2330' }}>{initials(a.affiliate_name || '')}</Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{a.affiliate_name || 'Unnamed'}</Typography>
                                <Typography sx={{ fontSize: 12, color: C.muted }}>{a.code} · {a.total_sales} sales</Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

            {detailError && <Alert severity="error" sx={{ mb: 3 }}>{detailError}</Alert>}

            {detailLoading && !detail ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
            ) : detail && aff && (
                <Box sx={{ opacity: detailLoading ? 0.55 : 1, transition: 'opacity .2s', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Profile */}
                    <Box
                        sx={{
                            ...cardSx, p: { xs: 2.5, md: 3 }, display: 'grid', gap: 3, alignItems: 'center',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1.5fr 1fr 1.15fr' },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                            <Avatar sx={{ width: 128, height: 128, fontSize: 42, fontWeight: 700, bgcolor: '#1f2330', background: 'linear-gradient(145deg,#2b2f3d,#0f1117)' }}>
                                {initials(name)}
                            </Avatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: C.text }}>{name}</Typography>
                                    <Box sx={{ px: 1.25, py: 0.4, borderRadius: 1.5, fontSize: 13, fontWeight: 500, bgcolor: isActive ? '#fde7b8' : '#eceef2', color: isActive ? '#9a5b00' : C.muted }}>
                                        {isActive ? 'Active Affiliate' : `${aff.status || 'Inactive'}`}
                                    </Box>
                                </Box>
                                <LabelledRow icon={<MailOutlinedIcon fontSize="small" />} value={aff.affiliate_email || '—'} />
                                <LabelledRow icon={<CalendarTodayOutlinedIcon fontSize="small" />} label="Date of Joining" value={fmtDate(parseDbDate(aff.created_at))} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: { lg: 4 }, borderLeft: { lg: `1px dashed ${C.border}` } }}>
                            <LabelledRow
                                icon={<LocalOfferOutlinedIcon fontSize="small" />}
                                label="Your Coupon Code"
                                value={
                                    <ButtonBase
                                        onClick={() => code && copy(code, 'Coupon code')}
                                        sx={{ mt: 0.75, px: 2, py: 1, gap: 2, borderRadius: 2, bgcolor: '#fde7b8', fontWeight: 700, fontSize: 16, color: C.text, letterSpacing: 0.3 }}
                                    >
                                        {code || '—'}
                                        <ContentCopyOutlinedIcon sx={{ fontSize: 18, color: C.muted }} />
                                    </ButtonBase>
                                }
                            />
                            <LabelledRow
                                icon={<CalendarTodayOutlinedIcon fontSize="small" />}
                                label="Code Expiry"
                                value={
                                    <Box component="span" sx={{ color: expired ? C.red : 'inherit' }}>
                                        {expiry ? fmtDate(expiry) : 'No expiry set'}{expired && ' (expired)'}
                                    </Box>
                                }
                            />
                        </Box>

                        <Box sx={{ gridColumn: { md: '1 / -1', lg: 'auto' }, pl: { lg: 3 }, borderLeft: { lg: `1px solid ${C.border}` } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2.5, borderRadius: 2, bgcolor: C.orangeTint }}>
                                <CardGiftcardOutlinedIcon sx={{ fontSize: 46, color: '#e4572e', flexShrink: 0 }} />
                                <Typography sx={{ fontSize: 15, color: C.text, lineHeight: 1.55 }}>
                                    Customers get <b>{aff.discount_percent ?? 0}% off</b> with this code, and {name.split(' ')[0]} earns <b>{aff.commission_percent}% commission</b> on every successful referral.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Stats */}
                    <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                        <StatCard
                            icon={<PeopleOutlinedIcon sx={{ fontSize: 30 }} />} iconBg="#e8f0fe" iconColor={C.blue}
                            label="Total Referrals" value={String(detail.summary.total_referrals)}
                            delta={stats.referralsDelta} deltaCaption="vs last month"
                        />
                        <StatCard
                            icon={<CurrencyRupeeIcon sx={{ fontSize: 30 }} />} iconBg={C.orangeTint} iconColor={C.orangeDark}
                            label="Total Earnings" value={inr(detail.summary.total_earnings)}
                            delta={stats.earningsDelta} deltaCaption="vs last quarter"
                        />
                    </Box>

                    {/* Charts */}
                    <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
                        <Box sx={{ ...cardSx, p: 2.5, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <CardTitle>Earnings Overview</CardTitle>
                                <Select size="small" value={period} onChange={(e) => setPeriod(e.target.value as 'monthly' | 'weekly')} sx={{ fontSize: 13, minWidth: 120 }}>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                </Select>
                            </Box>
                            <BarChart bars={overviewBars} />
                        </Box>

                        <Box sx={{ ...cardSx, p: 2.5, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <CardTitle>Quarterly Earnings</CardTitle>
                                <Select size="small" value={year} onChange={(e) => setYear(Number(e.target.value))} sx={{ fontSize: 13, minWidth: 120 }}>
                                    {years.map((y) => (
                                        <MenuItem key={y} value={y}>{y === new Date().getFullYear() ? 'This Year' : y}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <BarChart bars={quarterBars} showValues />
                        </Box>
                    </Box>

                    {/* Referrals + link */}
                    <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: '1.65fr 1fr' }, alignItems: 'start' }}>
                        <Box sx={{ ...cardSx, p: 2.5, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <CardTitle>Referral Details</CardTitle>
                                {referrals.length > PREVIEW_ROWS && (
                                    <Button size="small" onClick={() => setShowAll((v) => !v)} sx={{ textTransform: 'none', textDecoration: 'underline', color: C.blue, fontSize: 14 }}>
                                        {showAll ? 'Show Less' : `View All (${referrals.length})`}
                                    </Button>
                                )}
                            </Box>

                            {referrals.length === 0 ? (
                                <Typography sx={{ color: C.muted, textAlign: 'center', py: 6 }}>
                                    No referrals yet. Enrollments that use {code || 'this code'} will show up here.
                                </Typography>
                            ) : (
                                <TableContainer sx={{ maxHeight: showAll ? 520 : 'none' }}>
                                    <Table size="small" stickyHeader sx={{ minWidth: 640, '& td, & th': { borderColor: C.border, py: 1.35, fontSize: 14 } }}>
                                        <TableHead>
                                            <TableRow sx={{ '& th': { bgcolor: '#f3f4f6', fontWeight: 600, color: C.text } }}>
                                                <TableCell sx={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>#</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Referred User</TableCell>
                                                <TableCell>Plan Purchased</TableCell>
                                                <TableCell>Referral Amount</TableCell>
                                                <TableCell>Payment Status</TableCell>
                                                <TableCell sx={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }} />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {visibleReferrals.map((r, i) => (
                                                <TableRow key={r.id} hover>
                                                    <TableCell>{i + 1}</TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{fmtDate(r.date)}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title={r.name || ''} placement="top-start" disableHoverListener={!r.name}>
                                                            <span>{r.email || r.name || '—'}</span>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>{r.plan_name || '—'}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title={`${aff.commission_percent}% of ${inr(r.amount_paid)}`} placement="top">
                                                            <span style={{ fontWeight: 600 }}>{inr(r.commission)}</span>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell><StatusChip status={r.payment_status} /></TableCell>
                                                    <TableCell align="right">
                                                        <IconButton size="small" onClick={(e) => setRowMenu({ anchor: e.currentTarget, referral: r })}>
                                                            <MoreHorizIcon fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                            <Menu anchorEl={rowMenu?.anchor} open={!!rowMenu} onClose={() => setRowMenu(null)}>
                                <MenuItem disabled={!rowMenu?.referral.email} onClick={() => { copy(rowMenu!.referral.email!, 'Email'); setRowMenu(null); }}>
                                    Copy email
                                </MenuItem>
                                <MenuItem
                                    disabled={!rowMenu?.referral.email}
                                    component="a"
                                    href={`mailto:${rowMenu?.referral.email ?? ''}`}
                                    onClick={() => setRowMenu(null)}
                                >
                                    Send email
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Box sx={{ ...cardSx, p: 2.5 }}>
                            <CardTitle icon={<LinkIcon sx={{ transform: 'rotate(-45deg)' }} />}>Your Affiliate Link</CardTitle>
                            <Typography sx={{ fontSize: 14, color: C.muted, mt: 1, mb: 2 }}>Share this link directly with your network</Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', border: `1px solid ${C.border}`, borderRadius: 2, pl: 2, pr: 0.5, py: 0.5 }}>
                                <Typography sx={{ flex: 1, fontSize: 15, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {link || 'No code assigned'}
                                </Typography>
                                <IconButton disabled={!link} onClick={() => copy(link, 'Affiliate link')}>
                                    <ContentCopyOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Button
                                fullWidth
                                disabled={!link}
                                onClick={shareLink}
                                startIcon={<ShareOutlinedIcon />}
                                sx={{ mt: 2, py: 1.4, borderRadius: 2, bgcolor: C.orange, color: C.text, fontWeight: 700, fontSize: 16, textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f39c12' } }}
                            >
                                Share Link
                            </Button>

                            <Typography sx={{ fontSize: 14, fontWeight: 600, color: C.text, mt: 3, mb: 1.5 }}>Quick Share</Typography>
                            <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
                                {quickShare.map((s) => (
                                    <Tooltip key={s.label} title={s.label}>
                                        <span>
                                            <IconButton
                                                disabled={!link}
                                                onClick={s.onClick}
                                                aria-label={s.label}
                                                sx={{ width: 46, height: 46, background: s.bg, color: s.fg ?? '#fff', fontSize: 20, '&:hover': { background: s.bg, filter: 'brightness(0.92)' } }}
                                            >
                                                {s.icon}
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}

            <Snackbar
                open={!!toast}
                autoHideDuration={2000}
                onClose={() => setToast('')}
                message={toast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>,
    );
};

export default AffiliateDashboard;
