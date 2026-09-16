import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Card, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            navigate('/client/dashboard');
        }, 1500);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at top right, rgba(244, 121, 32, 0.15), transparent 400px), #0b0b0b'
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
                >
                    <LockOutlinedIcon fontSize="large" />
                    GRIND LOGIN
                </Typography>

                <Card sx={{ p: 5, borderRadius: 3, background: 'rgba(23, 23, 23, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', fontFamily: 'DM Sans', color: 'text.secondary' }}>
                        Access Your Fitness Portal
                    </Typography>

                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                            required
                            type="email"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 4 }}
                            required
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={loading}
                            sx={{ py: 2, fontSize: '1.1rem' }}
                        >
                            {loading ? <CircularProgress size={28} color="inherit" /> : 'SIGN IN'}
                        </Button>
                    </form>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account? <Button color="primary" sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }} onClick={() => navigate('/enrollment')}>Enroll Now</Button>
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;
