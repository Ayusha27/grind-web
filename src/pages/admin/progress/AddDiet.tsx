import React, { useState } from 'react';
import { Box, Typography, Card, TextField, Button, Grid, Alert } from '@mui/material';
import api from '../../../services/api';

const AddDiet = () => {
    const [formData, setFormData] = useState({
        access_token: '',
        diet_json: ''
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
            setFormData({ access_token: '', diet_json: '' });
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
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Access Token"
                                name="access_token"
                                value={formData.access_token}
                                onChange={handleChange}
                                variant="filled"
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Diet JSON (Paste raw JSON data here)"
                                name="diet_json"
                                value={formData.diet_json}
                                onChange={handleChange}
                                multiline
                                rows={10}
                                variant="filled"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setFormData({ access_token: '', diet_json: '' })}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Diet'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default AddDiet;
