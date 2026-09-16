import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import api from '../../../services/api';

const ClientsList = () => {
    const [clients, setClients] = useState<any[]>([]);

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
                <Typography variant="h2">Clients</Typography>
                <Button variant="contained" color="primary">Add New Client</Button>
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
                            {Array.isArray(clients) ? clients.map((row) => (
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
                                        <Button size="small" variant="text">View</Button>
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
        </Box>
    );
};

export default ClientsList;
