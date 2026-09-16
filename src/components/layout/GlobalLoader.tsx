import { useState, useEffect } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";

const GlobalLoader = () => {
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    const handleRequest = (config: any) => {
      setLoadingCount((count) => count + 1);
      return config;
    };

    const handleErrorReq = (error: any) => {
      setLoadingCount((count) => Math.max(0, count - 1));
      return Promise.reject(error);
    };

    const handleResponse = (response: any) => {
      setLoadingCount((count) => Math.max(0, count - 1));
      return response;
    };

    const handleErrorRes = (error: any) => {
      setLoadingCount((count) => Math.max(0, count - 1));
      return Promise.reject(error);
    };

    const requestInterceptor = axios.interceptors.request.use(
      handleRequest,
      handleErrorReq
    );

    const responseInterceptor = axios.interceptors.response.use(
      handleResponse,
      handleErrorRes
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <Backdrop
      sx={{
        color: "#ff5b38",
        zIndex: (theme) => theme.zIndex.drawer + 9999,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      open={loadingCount > 0}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <CircularProgress color="inherit" size={64} thickness={4.5} />
        
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: { xs: 32, sm: 40 },
              letterSpacing: 2,
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            Keep the Grind on
          </Typography>
          
          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 600,
              color: "#ff5b38",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Fetching Info...
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default GlobalLoader;
