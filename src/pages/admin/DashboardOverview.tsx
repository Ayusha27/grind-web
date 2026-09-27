import React, { useEffect, useMemo, useState } from 'react';
import { Box, ButtonBase, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckIcon from '@mui/icons-material/Check';
import api from '../../services/api';

const C = {
    card: '#121212',
    border: 'rgba(255,255,255,0.07)',
    muted: '#8a8784',
    text: '#f5f5f0',
    grid: 'rgba(255,255,255,0.06)',
};

const cardSx = { bgcolor: C.card, border: `1px solid ${C.border}`, borderRadius: 4 };

type Period = 'today' | '7' | '30' | '90';
const PERIODS: { key: Period; label: string; days: number }[] = [
    { key: 'today', label: 'Today', days: 1 },
    { key: '7', label: '7 days', days: 7 },
    { key: '30', label: '30 days', days: 30 },
    { key: '90', label: '90 days', days: 90 },
];

/** Start of the current period and of the one before it. "Today" starts at midnight. */
const periodBounds = (p: Period) => {
    const now = new Date();
    const days = PERIODS.find((x) => x.key === p)!.days;
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = p === 'today' ? midnight : new Date(now.getTime() - days * 86400000);
    const prevStart = new Date(start.getTime() - (p === 'today' ? 86400000 : days * 86400000));
    return { start, prevStart };
};

const parseDate = (v: unknown): Date | null => {
    if (typeof v !== 'string' || !v) return null;
    const d = new Date(v.replace(' ', 'T'));
    return Number.isNaN(d.getTime()) ? null : d;
};

const StatCard = ({ title, value, icon, color, footer }: {
    title: string; value: React.ReactNode; icon: React.ReactNode; color: string; footer: React.ReactNode;
}) => (
    <Box sx={{ ...cardSx, p: 2.75, display: 'flex', flexDirection: 'column', minHeight: 170 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#cfccc8', mt: 1 }}>
                {title}
            </Typography>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: `rgba(${color}, 0.15)`, color: `rgb(${color})` }}>
                {icon}
            </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            {value === null ? (
                <Box sx={{ width: 22, height: 3, borderRadius: 2, bgcolor: '#4a4846' }} />
            ) : (
                <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 48, lineHeight: 1, color: C.text }}>{value}</Typography>
            )}
        </Box>
        <Typography component="div" sx={{ fontSize: 14, color: C.muted }}>{footer}</Typography>
    </Box>
);

const DashboardOverview = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ clientsCount: 0 });
    const [clients, setClients] = useState<any[]>([]);
    const [period, setPeriod] = useState<Period>('7');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/admin/clients');
                const data = response.data;
                const clientsList = Array.isArray(data) ? data : (data?.data || data?.clients || []);
                setStats({ clientsCount: Array.isArray(clientsList) ? clientsList.length : 0 });
                setClients(Array.isArray(clientsList) ? clientsList : []);
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            }
        };
        fetchDashboardData();
    }, []);

    // Sign-ups in the selected period vs the one before it, from clients' created_at.
    const signups = useMemo(() => {
        const dates = clients.map((c) => parseDate(c?.created_at)).filter((d): d is Date => !!d);
        if (!dates.length) return null;
        const { start, prevStart } = periodBounds(period);
        const current = dates.filter((d) => d >= start).length;
        const previous = dates.filter((d) => d >= prevStart && d < start).length;
        return { current, previous };
    }, [clients, period]);

    const periodLabel = period === 'today' ? 'today' : `the last ${period} days`;
    const prevLabel = period === 'today' ? 'yesterday' : `previous ${period} days`;

    let growthValue: React.ReactNode = null;
    let growthFooter: React.ReactNode = 'Awaiting data';
    if (signups) {
        const { current, previous } = signups;
        if (previous > 0) {
            const pct = Math.round(((current - previous) / previous) * 100);
            growthValue = `${pct > 0 ? '+' : ''}${pct}%`;
            growthFooter = `New clients vs ${prevLabel}`;
        } else if (current > 0) {
            growthValue = 'New';
            growthFooter = `${current} sign-up${current > 1 ? 's' : ''}, none in ${prevLabel}`;
        } else {
            growthFooter = `No sign-ups in ${periodLabel}`;
        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, flexWrap: 'wrap', mb: 3.5 }}>
                <Box>
                    <Typography sx={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: { xs: 48, md: 64 }, lineHeight: 1, color: C.text }}>
                        Overview
                    </Typography>
                    <Typography sx={{ fontSize: 16, color: '#cfccc8', mt: 1 }}>
                        Welcome back, Admin. Here&rsquo;s today&rsquo;s summary.
                    </Typography>
                </Box>

                <Box role="tablist" aria-label="Period" sx={{ display: 'flex', p: 0.6, gap: 0.5, borderRadius: 2.5, border: `1px solid ${C.border}`, bgcolor: C.card }}>
                    {PERIODS.map((p) => {
                        const active = p.key === period;
                        return (
                            <ButtonBase
                                key={p.key}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setPeriod(p.key)}
                                sx={{
                                    px: 2, py: 1, borderRadius: 2, fontSize: 14, fontFamily: '"DM Sans", sans-serif',
                                    fontWeight: active ? 700 : 500, color: active ? C.text : '#cfccc8',
                                    bgcolor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                                    '&:hover': { color: C.text },
                                }}
                            >
                                {p.label}
                            </ButtonBase>
                        );
                    })}
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gap: 2.5, mb: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' } }}>
                <StatCard
                    title="Active Clients"
                    value={stats.clientsCount}
                    icon={<PeopleOutlinedIcon fontSize="small" />}
                    color="255, 92, 53"
                    footer={stats.clientsCount === 0 ? (
                        <>No clients yet · <Link component="button" underline="hover" onClick={() => navigate('/admin/clients/create')} sx={{ color: 'primary.main', fontWeight: 600, fontSize: 14, verticalAlign: 'baseline' }}>Add one</Link></>
                    ) : signups ? (
                        <><Box component="span" sx={{ color: signups.current ? '#22c55e' : C.muted, fontWeight: 600 }}>+{signups.current}</Box> new in {periodLabel}</>
                    ) : 'Total registered clients'}
                />
                <StatCard title="Programs Active" value={null} icon={<FitnessCenterIcon fontSize="small" />} color="34, 197, 94" footer="Awaiting data" />
                <StatCard title="Monthly Revenue" value={null} icon={<AttachMoneyIcon fontSize="small" />} color="59, 130, 246" footer="Awaiting data" />
                <StatCard title="Growth" value={growthValue} icon={<TrendingUpIcon fontSize="small" />} color="168, 85, 247" footer={growthFooter} />
            </Box>

            <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' } }}>
                <Box sx={{ ...cardSx, p: 3, display: 'flex', flexDirection: 'column', minHeight: 460 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                        <Box>
                            <Typography sx={{ fontSize: 20, fontWeight: 700, color: C.text }}>Workouts completed</Typography>
                            <Typography sx={{ fontSize: 14, color: C.muted }}>Last 7 days</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            {[['primary.main', 'This week'], ['#4a4846', 'Last week']].map(([color, label]) => (
                                <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, color: '#cfccc8' }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: color }} />{label}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ position: 'relative', flex: 1, mt: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {[0, 1, 2, 3, 4].map((i) => (
                            <Box key={i} sx={{ borderTop: `1px solid ${C.grid}` }} />
                        ))}
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 2 }}>
                            <Box sx={{ width: 48, height: 48, borderRadius: 2.5, border: `1px solid ${C.border}`, bgcolor: '#181818', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, mb: 1.5 }}>
                                <BarChartIcon />
                            </Box>
                            <Typography sx={{ fontSize: 15, fontWeight: 700, color: C.text }}>No workout data yet</Typography>
                            <Typography sx={{ fontSize: 13, color: C.muted, maxWidth: 300, mt: 0.5 }}>
                                Once clients start logging sessions, their weekly activity will chart here.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1.5 }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                            <Typography key={d} sx={{ fontSize: 12, color: C.muted }}>{d}</Typography>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ ...cardSx, p: 3 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 700, color: C.text, mb: 2 }}>Recent activity</Typography>
                    {/* Placeholder for activity feed */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.75, py: 1.75, borderBottom: i < 5 ? `1px solid ${C.border}` : 'none' }}>
                            <Box sx={{ width: 34, height: 34, borderRadius: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255, 92, 53, 0.14)', color: 'primary.main' }}>
                                <CheckIcon sx={{ fontSize: 18 }} />
                            </Box>
                            <Typography sx={{ fontSize: 15, fontWeight: 600, color: C.text }}>Client #{100 + i} completed their workout.</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardOverview;
