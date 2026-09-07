import { useState, useEffect } from 'react';
import { LinearProgress, Box } from '@mui/material';
import api from '../../services/api';

const GlobalLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let requestCount = 0;

    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        requestCount++;
        setLoading(true);
        return config;
      },
      (error) => {
        requestCount--;
        if (requestCount <= 0) {
          requestCount = 0;
          setLoading(false);
        }
        return Promise.reject(error);
      }
    );

    const resInterceptor = api.interceptors.response.use(
      (response) => {
        requestCount--;
        if (requestCount <= 0) {
          requestCount = 0;
          setLoading(false);
        }
        return response;
      },
      (error) => {
        requestCount--;
        if (requestCount <= 0) {
          requestCount = 0;
          setLoading(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, []);

  if (!loading) return null;

  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      <LinearProgress
        sx={{
          height: 4,
          backgroundColor: 'rgba(255, 92, 53, 0.2)', // Light orange background
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#ff5c35', // Solid orange bar
          }
        }}
      />
    </Box>
  );
};

export default GlobalLoader;
