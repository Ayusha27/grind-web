import React, { useState } from 'react';
import { Box, Typography, Card, TextField, Button, Grid, Alert } from '@mui/material';
import api from '../../../services/api';

const AddProgress = () => {
    const [formData, setFormData] = useState({
        clientId: '',
        weight: '',
        bodyFat: '',
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
            await api.post('/admin/progress', formData);
            setSuccess('Progress logged successfully!');
            setFormData({ clientId: '', weight: '', bodyFat: '', notes: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to log progress');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4 }}>Log Client Progress</Typography>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', p: 4, maxWidth: 800 }}>
                {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Client ID" name="clientId" value={formData.clientId} onChange={handleChange} variant="filled" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Weight (lbs/kg)" name="weight" value={formData.weight} onChange={handleChange} type="number" variant="filled" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Body Fat % (Optional)" name="bodyFat" value={formData.bodyFat} onChange={handleChange} type="number" variant="filled" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Coach Notes" name="notes" value={formData.notes} onChange={handleChange} multiline rows={4} variant="filled" />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" color="inherit">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Logging...' : 'Log Progress'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default AddProgress;
