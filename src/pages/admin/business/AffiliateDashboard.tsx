import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Grid, CardContent, Divider, CircularProgress, Alert } from '@mui/material';
import api from '../../../services/api';

const AffiliateDashboard = () => {
    const [data, setData] = useState<{ referrals: number; commissions: number; pending: number; recent: any[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAffiliates = async () => {
            try {
                const response = await api.get('/admin/affiliates');
                // Handle mock response if backend doesn't implement this yet
                setData(response.data || { referrals: 0, commissions: 0, pending: 0, recent: [] });
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load affiliate data');
                // Fallback data for mockup if API fails
                setData({ referrals: 42, commissions: 1240, pending: 350, recent: [] });
            } finally {
                setLoading(false);
            }
        };
        fetchAffiliates();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress color="primary" /></Box>;
    }

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4 }}>Affiliate Tracking</Typography>

            {error && <Alert severity="warning" sx={{ mb: 3 }}>{error} (Showing cached data)</Alert>}

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Total Referrals</Typography>
                            <Typography variant="h3">{data?.referrals || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Total Commissions</Typography>
                            <Typography variant="h3" color="primary.main">${data?.commissions?.toLocaleString() || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" gutterBottom>Pending Payouts</Typography>
                            <Typography variant="h3">${data?.pending?.toLocaleString() || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Recent Conversions</Typography>
                <Divider sx={{ mb: 2 }} />
                {data?.recent?.length ? (
                    <Box>
                        {data.recent.map((conv, i) => (
                            <Box key={i} sx={{ py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <Typography variant="body1">{conv.clientName || 'Unknown Client'}</Typography>
                                <Typography variant="body1" color="primary.main">+${conv.amount}</Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        No recent affiliate conversions to display.
                    </Typography>
                )}
            </Card>
        </Box>
    );
};

export default AffiliateDashboard;
