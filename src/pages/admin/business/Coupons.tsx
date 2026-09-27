import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import api from '../../../services/api';

const Coupons = () => {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        affiliate_name: '',
        affiliate_email: '',
        passcode: '',
        discount_percent: '',
        commission_percent: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Revoke dialog state
    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
    const [couponToRevoke, setCouponToRevoke] = useState<number | null>(null);

    const fetchCoupons = async () => {
        try {
            const response = await api.get('/admin/affiliates');
            if (response.data && response.data.affiliates) {
                const mappedCoupons = response.data.affiliates.map((aff: any) => ({
                    id: aff.id,
                    code: aff.code,
                    name: aff.affiliate_name,
                    email: aff.affiliate_email,
                    passcode: aff.passcode,
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

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ code: '', affiliate_name: '', affiliate_email: '', passcode: '', discount_percent: '', commission_percent: '' });
        setError('');
        setSuccess('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await api.post('/admin/affiliates', formData);
            setSuccess('Coupon created successfully!');
            fetchCoupons();
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create coupon');
        } finally {
            setLoading(false);
        }
    };

    const handleRevokeClick = (id: number) => {
        setCouponToRevoke(id);
        setRevokeDialogOpen(true);
    };

    const handleConfirmRevoke = async () => {
        if (couponToRevoke === null) return;
        try {
            await api.delete(`/admin/affiliates/${couponToRevoke}`);
            setRevokeDialogOpen(false);
            setCouponToRevoke(null);
            fetchCoupons();
        } catch (err) {
            console.error("Failed to revoke coupon:", err);
            alert("Failed to delete coupon.");
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h2">Discount Coupons</Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>Create Coupon</Button>
            </Box>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary' }}>Code</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Name</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Email</TableCell>
                                <TableCell sx={{ color: 'text.secondary' }}>Passcode</TableCell>
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
                                    <TableCell>{row.name || 'N/A'}</TableCell>
                                    <TableCell>{row.email || 'N/A'}</TableCell>
                                    <TableCell>{row.passcode || 'N/A'}</TableCell>
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
                                        <Button size="small" variant="text" color="error" onClick={() => handleRevokeClick(row.id)}>Revoke</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Coupon / Affiliate</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
                        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                            <TextField label="Coupon Code" name="code" value={formData.code} onChange={handleChange} required fullWidth />
                            <TextField label="Affiliate Name" name="affiliate_name" value={formData.affiliate_name} onChange={handleChange} required fullWidth />
                            <TextField label="Affiliate Email" name="affiliate_email" type="email" value={formData.affiliate_email} onChange={handleChange} required fullWidth />
                            <TextField label="Passcode" name="passcode" type="text" value={formData.passcode} onChange={handleChange} required fullWidth helperText="Used by the affiliate to login to their dashboard" />
                            <TextField label="Discount Percent (%)" name="discount_percent" type="number" value={formData.discount_percent} onChange={handleChange} fullWidth />
                            <TextField label="Commission Percent (%)" name="commission_percent" type="number" value={formData.commission_percent} onChange={handleChange} fullWidth />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={revokeDialogOpen} onClose={() => setRevokeDialogOpen(false)}>
                <DialogTitle>Confirm Revoke</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to revoke and delete this coupon? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRevokeDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmRevoke} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Coupons;
