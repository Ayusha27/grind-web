import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, IconButton, useTheme, useMediaQuery, Collapse } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 260;

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [clientsOpen, setClientsOpen] = useState(false);
    const [plansOpen, setPlansOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { title: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
    ];

    const clientItems = [
        { title: 'All Clients', path: '/admin/clients', icon: <PeopleIcon /> },
        { title: 'Create Client', path: '/admin/clients/create', icon: <PersonAddIcon /> },
    ];

    const planItems = [
        { title: 'Create Workout Plan', path: '/admin/plans/create', icon: <FitnessCenterIcon /> },
        // { title: 'Import Workout', path: '/admin/plans/import', icon: <FitnessCenterIcon /> },
        // { title: 'Add Progress', path: '/admin/progress/add', icon: <MonitorHeartIcon /> },
        { title: 'Add Diet', path: '/admin/diet/add', icon: <MonitorHeartIcon /> },
    ];

    const businessItems = [
        { title: 'Coupons', path: '/admin/business/coupons', icon: <LocalOfferIcon /> },
        { title: 'Affiliate', path: '/admin/business/affiliate', icon: <MonetizationOnIcon /> },
    ];

    const renderNavItem = (item: any, isSubItem = false) => {
        const active = location.pathname === item.path;
        return (
            <ListItem
                component="button"
                key={item.path}
                onClick={() => { navigate(item.path); if (isMobile) setMobileOpen(false); }}
                sx={{
                    py: 1.5,
                    px: isSubItem ? 4 : 2.5,
                    color: active ? 'primary.main' : 'text.secondary',
                    background: active ? 'rgba(244, 121, 32, 0.08)' : 'transparent',
                    borderRight: active ? '3px solid #f47920' : '3px solid transparent',
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.02)',
                        color: active ? 'primary.main' : 'text.primary',
                    }
                }}
            >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.title}
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontSize: '0.85rem',
                            fontWeight: active ? 600 : 400,
                            fontFamily: 'DM Sans'
                        }
                    }}
                />
            </ListItem>
        );
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f0f0f', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <Box sx={{ p: 3, pb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 42,
                            lineHeight: 1,
                            fontWeight: 900,
                            letterSpacing: '1.5px',
                            color: "#f5f5f0",
                            whiteSpace: "nowrap",
                            fontFamily: '"Bebas Neue", sans-serif'
                        }}
                    >
                        GRIND
                        <Box component="span" sx={{ color: "primary.main" }}>
                            .
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: 10,
                            lineHeight: 1,
                            letterSpacing: 4,
                            fontWeight: 700,
                            color: "#716d69",
                            whiteSpace: "nowrap",
                            textAlign: 'center',
                            opacity: 0.8
                        }}
                    >
                        POWERED BY <Box component="span" sx={{ color: "primary.main" }}>TREND</Box>
                    </Typography>
                </Box>
            </Box>

            <List sx={{ flex: 1, overflowY: 'auto', px: 0 }}>
                {menuItems.map(item => renderNavItem(item))}

                {/* Clients Section */}
                <ListItem component="button" onClick={() => setClientsOpen(!clientsOpen)} sx={{ px: 2.5, mt: 1, width: '100%', textAlign: 'left', border: 'none', bgcolor: 'transparent', cursor: 'pointer' }}>
                    <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Clients" sx={{ '& .MuiListItemText-primary': { fontSize: '0.85rem', fontFamily: 'DM Sans', color: 'text.secondary' } }} />
                    {clientsOpen ? <ExpandLess sx={{ color: 'text.secondary' }} /> : <ExpandMore sx={{ color: 'text.secondary' }} />}
                </ListItem>
                <Collapse in={clientsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {clientItems.map(item => renderNavItem(item, true))}
                    </List>
                </Collapse>

                {/* Plans & Progress */}
                <ListItem component="button" onClick={() => setPlansOpen(!plansOpen)} sx={{ px: 2.5, mt: 1, width: '100%', textAlign: 'left', border: 'none', bgcolor: 'transparent', cursor: 'pointer' }}>
                    <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}><FitnessCenterIcon /></ListItemIcon>
                    <ListItemText primary="Programs" sx={{ '& .MuiListItemText-primary': { fontSize: '0.85rem', fontFamily: 'DM Sans', color: 'text.secondary' } }} />
                    {plansOpen ? <ExpandLess sx={{ color: 'text.secondary' }} /> : <ExpandMore sx={{ color: 'text.secondary' }} />}
                </ListItem>
                <Collapse in={plansOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {planItems.map(item => renderNavItem(item, true))}
                    </List>
                </Collapse>

                <Typography variant="caption" sx={{ px: 3, mt: 3, mb: 1, display: 'block', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Business
                </Typography>
                {businessItems.map(item => renderNavItem(item))}
            </List>

            <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <ListItem component="button" onClick={() => navigate('/admin/login')} sx={{ borderRadius: 1, width: '100%', textAlign: 'left', border: 'none', bgcolor: 'transparent', cursor: 'pointer' }}>
                    <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ '& .MuiListItemText-primary': { color: 'error.main', fontSize: '0.85rem', fontWeight: 600 } }} />
                </ListItem>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#050505' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: 'rgba(5,5,5,0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Admin Portal</Typography>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, mt: 8, width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, overflowX: 'hidden' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
