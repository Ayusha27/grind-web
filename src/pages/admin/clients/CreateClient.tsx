import React, { useState } from 'react';
import { Box, Typography, Card, TextField, Button, Grid, MenuItem, Alert } from '@mui/material';
import api from '../../../services/api';

const CreateClient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: 'Active',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        try {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone,
                goal: formData.notes
            };
            await api.post('/admin/clients', payload);
            setSuccess('Client created successfully! Their portal access token has been generated.');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', status: 'Active', notes: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create client');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4 }}>Create Client</Typography>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', p: 4, maxWidth: 800 }}>
                {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} variant="filled" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} variant="filled" required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} variant="filled" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Phone (Optional)" name="phone" value={formData.phone} onChange={handleChange} variant="filled" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth label="Status" name="status" value={formData.status} onChange={handleChange} variant="filled">
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Notes / Goals" name="notes" value={formData.notes} onChange={handleChange} multiline rows={4} variant="filled" />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" color="inherit">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Create Client'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default CreateClient;
