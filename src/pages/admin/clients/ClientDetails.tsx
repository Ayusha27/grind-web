import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Grid, CardContent, Divider, Button, Chip, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

const ClientDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState<any>(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await api.get(`/admin/clients/${id}`);
                setClient(response.data.client || response.data);
            } catch (err) {
                console.error('Error fetching client details', err);
            }
        };
        if (id) fetchClient();
    }, [id]);

    if (!client) {
        return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Box>
                        <Typography variant="h2" sx={{ mb: 1 }}>{client.firstName} {client.lastName || client.name}</Typography>
                        <Typography variant="body1" color="text.secondary">{client.email} • {client.phone || ''}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Chip label={client.status || 'Active'} color={client.status === 'Active' ? 'success' : 'default'} sx={{ borderRadius: 1 }} />
                        <Button variant="outlined" startIcon={<EditIcon />}>Edit Info</Button>
                    </Box>        </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Current Plan</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{client.active_plan || client.plan || 'No Active Plan'}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Started: {client.created_at || 'N/A'}</Typography>
                            <Button fullWidth variant="contained" size="small">Change Plan</Button>
                        </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Stats & Metrics</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">Weight</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>82 kg</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">Height</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>180 cm</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">Goal</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Muscle Gain</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Progress History</Typography>
                                <Button size="small" startIcon={<PictureAsPdfIcon />}>Export</Button>
                            </Box>
                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ overflowX: 'auto' }}>
                                <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 2 }}>
                                    Graph plotting weight / measurements over time will render here.
                                </Box>
                            </Box>

                            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Recent Logs</Typography>
                            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Week 4 Check-in</Typography>
                                <Typography variant="body2" color="text.secondary">Feb 15, 2026</Typography>
                            </Box>
                            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Week 3 Check-in</Typography>
                                <Typography variant="body2" color="text.secondary">Feb 08, 2026</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClientDetails;
