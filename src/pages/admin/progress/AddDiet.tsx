import React, { useState } from 'react';
import { Box, Typography, Card, TextField, Button, Grid, Alert } from '@mui/material';
import api from '../../../services/api';

const AddDiet = () => {
    const [formData, setFormData] = useState({
        clientId: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
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
            await api.post('/admin/diet', formData);
            setSuccess('Diet protocol logged successfully!');
            setFormData({ clientId: '', calories: '', protein: '', carbs: '', fats: '', notes: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to log diet');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4 }}>Assign Diet Protocol</Typography>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', p: 4, maxWidth: 800 }}>
                {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Client ID" name="clientId" value={formData.clientId} onChange={handleChange} variant="filled" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Daily Calories Target" name="calories" value={formData.calories} onChange={handleChange} type="number" variant="filled" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Protein (g)" name="protein" value={formData.protein} onChange={handleChange} type="number" variant="filled" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Carbs (g)" name="carbs" value={formData.carbs} onChange={handleChange} type="number" variant="filled" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Fats (g)" name="fats" value={formData.fats} onChange={handleChange} type="number" variant="filled" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Nutrition Notes / Meal Timings" name="notes" value={formData.notes} onChange={handleChange} multiline rows={4} variant="filled" />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" color="inherit">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Logging...' : 'Save Diet'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default AddDiet;
