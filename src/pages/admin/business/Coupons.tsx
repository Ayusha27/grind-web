import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
        commission_percent: '',
        expiry_date: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
    const [couponToRevoke, setCouponToRevoke] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDateFocused, setIsDateFocused] = useState(false);

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
                    raw_discount: aff.discount_percent,
                    commission: aff.commission_percent,
                    usage: `${aff.total_sales}`,
                    expires: aff.expiry_date ? new Date(aff.expiry_date.replace(' ', 'T')).toLocaleDateString() : 'N/A',
                    raw_expiry: aff.expiry_date,
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

    const handleOpen = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ code: '', affiliate_name: '', affiliate_email: '', passcode: '', discount_percent: '', commission_percent: '', expiry_date: '' });
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setFormData({ code: '', affiliate_name: '', affiliate_email: '', passcode: '', discount_percent: '', commission_percent: '', expiry_date: '' });
        setError('');
        setSuccess('');
        setIsEditing(false);
        setEditingId(null);
    };

    const handleEditClick = (row: any) => {
        setIsEditing(true);
        setEditingId(row.id);
        setFormData({
            code: row.code,
            affiliate_name: row.name,
            affiliate_email: row.email,
            passcode: row.passcode,
            discount_percent: row.raw_discount || '',
            commission_percent: row.commission || '',
            expiry_date: row.raw_expiry ? row.raw_expiry.replace(' ', 'T').slice(0, 10) : ''
        });
        setError('');
        setSuccess('');
        setOpen(true);
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
            if (isEditing) {
                await api.put(`/admin/affiliates/${editingId}`, formData);
                setSuccess('Coupon updated successfully!');
            } else {
                await api.post('/admin/affiliates', formData);
                setSuccess('Coupon created successfully!');
            }
            fetchCoupons();
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} coupon`);
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
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {row.code}
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    const link = `${window.location.origin}${import.meta.env.BASE_URL}client/enrollment?ref=${encodeURIComponent(row.code)}`;
                                                    navigator.clipboard.writeText(link);
                                                }}
                                                title="Copy Enrollment Link"
                                            >
                                                <ContentCopyIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
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
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <IconButton size="small" color="primary" onClick={() => handleEditClick(row)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <Typography sx={{ color: 'text.secondary', mx: 0.5, fontSize: 18 }}>/</Typography>
                                            <IconButton size="small" color="error" onClick={() => handleRevokeClick(row.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditing ? 'Edit Coupon' : 'Create New Coupon / Affiliate'}</DialogTitle>
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
                            <TextField 
                                label="Expiry Date" 
                                name="expiry_date" 
                                type={(isDateFocused || formData.expiry_date) ? "date" : "text"} 
                                onFocus={() => setIsDateFocused(true)}
                                onBlur={() => setIsDateFocused(false)}
                                value={formData.expiry_date} 
                                onChange={handleChange} 
                                fullWidth 
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save' : 'Create')}
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
