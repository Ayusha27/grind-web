import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Snackbar } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../../services/api';
import ClientProgressDialog, { type ProgressDialogClient } from '../../../components/admin/ClientProgressDialog';

// Welcome message with the client's portal link and their code.
// The code is needed on iPhone, where the installed app asks for it on first launch.
const buildInvite = (row: any, code: string) => {
    const name = row.first_name || row.name || 'there';
    const link = `${window.location.origin}/GRIND/client/dashboard/workout?token=${encodeURIComponent(code)}`;
    return `Hi ${name}, welcome to GRIND!\n\nOpen your plan here: ${link}\n\nYour GRIND code: ${code}\n(Keep this handy - on iPhone you'll need it once after adding GRIND to your Home Screen.)`;
};

const ClientsList = () => {
    const [clients, setClients] = useState<any[]>([]);
    const navigate = useNavigate();
    // ?q= comes from the admin header search.
    const [searchParams] = useSearchParams();
    const query = (searchParams.get('q') || '').trim().toLowerCase();
    const [viewing, setViewing] = useState<ProgressDialogClient | null>(null);
    const [toast, setToast] = useState('');

    const copy = async (text: string, message: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setToast(message);
        } catch {
            setToast('Could not copy to clipboard');
        }
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get('/admin/clients');
                const jsonData = response.data;
                const clientsList = Array.isArray(jsonData) ? jsonData : (jsonData?.data || jsonData?.clients || []);
                setClients(clientsList);
            } catch (err) {
                console.error('Error fetching clients', err);
            }
        };
        fetchClients();
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h2">Clients</Typography>
                    {query && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.7 }}>
                            Showing results for &ldquo;{searchParams.get('q')}&rdquo; &middot;{' '}
                            <Box component="span" onClick={() => navigate('/admin/clients')} sx={{ color: 'primary.main', cursor: 'pointer' }}>Clear</Box>
                        </Typography>
                    )}
                </Box>
                <Button variant="contained" color="primary" onClick={() => navigate('/admin/clients/create')}>Add New Client</Button>
            </Box>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary' }}>ID</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Name</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Email</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Plan</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
                                <TableCell sx={{ color: 'text.secondary', textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(clients) ? clients.filter((row) => !query || [row.name, row.first_name, row.last_name, row.email, row.phone, row.id].some((v) => String(v ?? '').toLowerCase().includes(query))).map((row) => (
                                <TableRow key={row.id || row._id || Math.random()}>
                                    <TableCell>#{row.id || row._id || 'N/A'}</TableCell>
                                    <TableCell>{row.name || (row.first_name + ' ' + row.last_name)}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.plan || 'Base'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status || 'Active'}
                                            size="small"
                                            color={row.status === 'Active' ? 'success' : 'default'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        {row.access_token?.trim() && (
                                            <>
                                                <Button size="small" variant="text" onClick={() => copy(row.access_token.trim(), 'Code copied')}>Copy code</Button>
                                                <Button size="small" variant="text" onClick={() => copy(buildInvite(row, row.access_token.trim()), 'Invite message copied')}>Copy invite</Button>
                                            </>
                                        )}
                                        <Button size="small" variant="text" onClick={() => setViewing(row)}>View</Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                                        No clients fully loaded or invalid format.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <ClientProgressDialog client={viewing} onClose={() => setViewing(null)} />
            <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast('')} message={toast} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
        </Box>
    );
};

export default ClientsList;
