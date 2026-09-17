import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Card, CircularProgress, Alert } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const response = await api.post('/admin/login', { username: email, password });

            const token = response.data?.token || response.data?.access_token;
            if (token) {
                localStorage.setItem('grind_token', token);
                navigate('/admin/dashboard');
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
            console.error('Admin login error', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Subtle decorative background shapes */}
            <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,121,32,0.05) 0%, transparent 70%)' }} />
            <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)' }} />

            <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <AdminPanelSettingsIcon sx={{ fontSize: 64, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h2" sx={{ letterSpacing: '2px' }}>
                        COMMAND CENTER
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Restricted Access
                    </Typography>
                </Box>

                <Card sx={{ p: 4, borderRadius: 2, background: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                    {error && <Alert severity="error" sx={{ mb: 3 }}>Invalid credentials.</Alert>}
                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Admin ID or Email"
                            variant="filled"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2, background: 'rgba(0,0,0,0.2)' }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Passcode"
                            variant="filled"
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 4, background: 'rgba(0,0,0,0.2)' }}
                            required
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={loading}
                            sx={{ py: 1.5, letterSpacing: '1px' }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'AUTHORIZE'}
                        </Button>
                    </form>
                </Card>
            </Container>
        </Box>
    );
};

export default AdminLogin;
