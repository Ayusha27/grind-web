import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import api from '../../../services/api';

const Coupons = () => {
    const [coupons, setCoupons] = useState<any[]>([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await api.get('/admin/affiliates');
                if (response.data && response.data.affiliates) {
                    const mappedCoupons = response.data.affiliates.map((aff: any) => ({
                        code: aff.code,
                        discount: `${aff.discount_percent}%`,
                        usage: `${aff.total_sales}`,
                        expires: 'N/A', // no expiry available on dashboard route currently
                        status: aff.status === 'active' ? 'Active' : 'Expired'
                    }));
                    setCoupons(mappedCoupons);
                }
            } catch (err) {
                console.error("Failed to fetch coupons:", err);
            }
        };
        fetchCoupons();
    }, []);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h2">Discount Coupons</Typography>
                <Button variant="contained" color="primary">Create Coupon</Button>
            </Box>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary' }}>Code</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Discount</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Usage</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Expires</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
                                <TableCell sx={{ color: 'text.secondary', textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coupons.map((row) => (
                                <TableRow key={row.code}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{row.code}</TableCell>
                                    <TableCell>{row.discount}</TableCell>
                                    <TableCell>{row.usage}</TableCell>
                                    <TableCell>{row.expires}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            color={row.status === 'Active' ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'right' }}>
                                        <Button size="small" variant="text" color="error">Revoke</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default Coupons;
