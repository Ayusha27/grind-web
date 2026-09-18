import React, { useState } from 'react';
import { Box, Typography, Card, TextField, Button, Grid, Alert } from '@mui/material';
import api from '../../../services/api';

const CreatePlan = () => {
    const [formData, setFormData] = useState({
        client_id: '',
        plan_name: '',
        workout_json: ''
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
            await api.post('/admin/plans', {
                ...formData,
                client_id: parseInt(formData.client_id, 10)
            });
            setSuccess('Plan created successfully!');
            setFormData({ client_id: '', plan_name: '', workout_json: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create plan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4 }}>Create New Plan</Typography>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', p: 4, maxWidth: 800 }}>
                {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Client ID"
                                name="client_id"
                                value={formData.client_id}
                                onChange={handleChange}
                                type="number"
                                variant="filled"
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Plan Name"
                                name="plan_name"
                                value={formData.plan_name}
                                onChange={handleChange}
                                variant="filled"
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Workout JSON (Paste raw JSON data here)"
                                name="workout_json"
                                value={formData.workout_json}
                                onChange={handleChange}
                                multiline
                                rows={10}
                                variant="filled"
                                required
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setFormData({ client_id: '', plan_name: '', workout_json: '' })}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Plan'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default CreatePlan;
