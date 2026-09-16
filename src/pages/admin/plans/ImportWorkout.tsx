import React, { useState } from 'react';
import { Box, Typography, Card, Button, Paper, Alert, CircularProgress } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import api from '../../../services/api';

const ImportWorkout = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setSuccess('');
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/admin/plans/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess('Workout plan imported successfully!');
            setFile(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to import workout.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4 }}>Import Workout</Typography>

            <Card sx={{ bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)', p: 4, maxWidth: 600 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Upload a compatible JSON or CSV file to quickly import a set of exercises into a plan.
                </Typography>

                {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Paper
                    variant="outlined"
                    sx={{
                        p: 6,
                        textAlign: 'center',
                        bgcolor: dragActive ? 'rgba(244,121,32,0.1)' : 'transparent',
                        borderStyle: 'dashed',
                        borderColor: dragActive ? 'primary.main' : 'rgba(255,255,255,0.2)',
                        cursor: 'pointer'
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                >
                    <FileUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    {!file ? (
                        <>
                            <Typography variant="h6" sx={{ mb: 1 }}>Drag & Drop file here</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                or click below to browse your computer
                            </Typography>
                            <Button variant="contained" component="label">
                                Browse Files
                                <input hidden accept=".csv,.json" type="file" onChange={handleChange} />
                            </Button>
                        </>
                    ) : (
                        <Typography variant="h6" color="primary.main">{file.name}</Typography>
                    )}
                </Paper>

                {file && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" color="inherit" onClick={() => setFile(null)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Import'}
                        </Button>
                    </Box>
                )}
            </Card>
        </Box>
    );
};

export default ImportWorkout;
