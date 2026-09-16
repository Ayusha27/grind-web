import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import api from '../../services/api';

const StatCard = ({ title, value, icon, color }: any) => (
    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3, '&:last-child': { pb: 3 } }}>
            <Box sx={{
                width: 56, height: 56,
                borderRadius: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: `rgba(${color}, 0.1)`,
                color: `rgb(${color})`,
                mr: 2
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '1px', mb: 0.5 }}>
                    {title}
                </Typography>
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, m: 0 }}>
                    {value}
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

const DashboardOverview = () => {
    const [stats, setStats] = useState({ clientsCount: 0 });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/admin/clients');
                const data = response.data;
                const clientsList = Array.isArray(data) ? data : (data?.data || data?.clients || []);
                setStats({ clientsCount: Array.isArray(clientsList) ? clientsList.length : 0 });
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 1 }}>Overview</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Welcome back, Admin. Here is the daily summary.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Active Clients" value={stats.clientsCount} icon={<PeopleIcon fontSize="large" />} color="244, 121, 32" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Programs Active" value="-" icon={<FitnessCenterIcon fontSize="large" />} color="34, 197, 94" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Monthly Rev" value="-" icon={<MonetizationOnIcon fontSize="large" />} color="59, 130, 246" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Growth" value="-" icon={<TrendingUpIcon fontSize="large" />} color="168, 85, 247" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">Main Chart Placeholder</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', height: '400px', p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Recent Activity</Typography>
                        {/* Placeholder for activity feed */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                                <Typography variant="body2" color="text.secondary">Client #{100 + i} completed their workout.</Typography>
                            </Box>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardOverview;
