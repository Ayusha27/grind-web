import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar, Box, Button, ButtonBase, Collapse, Drawer, IconButton, InputBase, Menu, MenuItem,
    Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getToken } from '../../utils/auth';

const drawerWidth = 264;
const headerHeight = 72;

const C = {
    bg: '#0a0a0a',
    sidebar: '#0f0f0f',
    border: 'rgba(255,255,255,0.06)',
    muted: '#8a8784',
    faint: '#5f5c59',
    text: '#f5f5f0',
    hover: 'rgba(255,255,255,0.03)',
    activeBg: 'rgba(255, 92, 53, 0.12)',
};

type NavItem = { title: string; path: string; icon?: React.ReactNode };

/** The admin JWT's `sub` is the admin username; shown in the sidebar profile. */
const adminUsername = (): string | null => {
    try {
        const token = getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return typeof payload.sub === 'string' ? payload.sub : null;
    } catch {
        return null;
    }
};

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [clientsOpen, setClientsOpen] = useState(false);
    const [plansOpen, setPlansOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const username = adminUsername();

    const decodeToken = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch(e) {
            return null;
        }
    };

    const token = localStorage.getItem('grind_token') || '';
    const payload = decodeToken(token);
    const isAffiliate = payload?.typ === 'affiliate';

    React.useEffect(() => {
        if (isAffiliate && location.pathname !== '/admin/business/affiliate') {
            navigate('/admin/business/affiliate', { replace: true });
        }
    }, [isAffiliate, location.pathname, navigate]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems: NavItem[] = [
        { title: 'Dashboard', path: '/admin/dashboard', icon: <SpaceDashboardOutlinedIcon fontSize="small" /> },
    ];

    const clientItems: NavItem[] = [
        { title: 'All Clients', path: '/admin/clients' },
        { title: 'Create Client', path: '/admin/clients/create' },
    ];

    const planItems: NavItem[] = [
        { title: 'Create Workout Plan', path: '/admin/plans/create' },
        // { title: 'Import Workout', path: '/admin/plans/import' },
        // { title: 'Add Progress', path: '/admin/progress/add' },
        { title: 'Add Diet', path: '/admin/diet/add' },
    ];

    const businessItems: NavItem[] = [
        { title: 'Coupons', path: '/admin/business/coupons', icon: <LocalOfferOutlinedIcon fontSize="small" /> },
        { title: 'Affiliate', path: '/admin/business/affiliate', icon: <MonetizationOnOutlinedIcon fontSize="small" /> },
    ];

    // Open the group that contains the current page, so the active link is visible.
    useEffect(() => {
        if (clientItems.some((i) => i.path === location.pathname)) setClientsOpen(true);
        if (planItems.some((i) => i.path === location.pathname)) setPlansOpen(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    // Ctrl/⌘ + K focuses the search box.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const go = (path: string) => {
        navigate(path);
        if (isMobile) setMobileOpen(false);
    };

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = search.trim();
        navigate(q ? `/admin/clients?q=${encodeURIComponent(q)}` : '/admin/clients');
    };

    const sectionLabel = (text: string) => (
        <Typography sx={{ px: 1.5, pt: 3, pb: 1, fontSize: 11, fontWeight: 600, letterSpacing: '2px', color: C.faint, textTransform: 'uppercase' }}>
            {text}
        </Typography>
    );

    const renderNavItem = (item: NavItem) => {
        const active = location.pathname === item.path;
        const disabled = isAffiliate && item.path !== '/admin/business/affiliate';

        return (
            <ButtonBase
                key={item.path}
                disabled={disabled}
                onClick={() => { if (!disabled) go(item.path); }}
                sx={{
                    width: '100%', justifyContent: 'flex-start', gap: 1.5,
                    px: 1.5, py: 1.25, mb: 0.5, borderRadius: 2.5,
                    fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: active ? 600 : 500,
                    color: active ? 'primary.main' : '#d6d3cf',
                    bgcolor: active ? C.activeBg : 'transparent',
                    opacity: disabled ? 0.4 : 1,
                    '&:hover': { bgcolor: active ? C.activeBg : C.hover, color: active ? 'primary.main' : C.text },
                }}
            >
                <Box sx={{ display: 'flex', color: active ? 'primary.main' : C.muted }}>{item.icon}</Box>
                {item.title}
            </ButtonBase>
        );
    };

    const renderSubItem = (item: NavItem) => {
        const active = location.pathname === item.path;
        return (
            <ButtonBase
                key={item.path}
                onClick={() => go(item.path)}
                sx={{
                    width: '100%', justifyContent: 'flex-start',
                    pl: 3.5, pr: 1.5, py: 1.1, borderRadius: 2,
                    fontFamily: '"DM Sans", sans-serif', fontSize: 14,
                    color: active ? 'primary.main' : C.muted, fontWeight: active ? 600 : 400,
                    '&:hover': { color: active ? 'primary.main' : C.text, bgcolor: C.hover },
                }}
            >
                {item.title}
            </ButtonBase>
        );
    };

    const renderGroup = (title: string, icon: React.ReactNode, open: boolean, toggle: () => void, items: NavItem[]) => {
        const containsActive = items.some((i) => i.path === location.pathname);
        return (
            <>
                <ButtonBase
                    onClick={toggle}
                    sx={{
                        width: '100%', justifyContent: 'flex-start', gap: 1.5,
                        px: 1.5, py: 1.25, mb: 0.5, borderRadius: 2.5,
                        fontFamily: '"DM Sans", sans-serif', fontSize: 15, fontWeight: 500,
                        color: containsActive ? C.text : '#d6d3cf',
                        '&:hover': { bgcolor: C.hover, color: C.text },
                    }}
                >
                    <Box sx={{ display: 'flex', color: C.muted }}>{icon}</Box>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>{title}</Box>
                    {open ? <ExpandLess fontSize="small" sx={{ color: C.muted }} /> : <ExpandMore fontSize="small" sx={{ color: C.muted }} />}
                </ButtonBase>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ ml: 2.75, mb: 1, borderLeft: `1px solid ${C.border}` }}>
                        {items.map(renderSubItem)}
                    </Box>
                </Collapse>
            </>
        );
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: C.sidebar, borderRight: `1px solid ${C.border}` }}>
            <Box sx={{ px: 3.5, pt: 3.5, pb: 2 }}>
                <Typography sx={{ fontSize: 40, lineHeight: 1, letterSpacing: '1px', color: C.text, fontFamily: '"Bebas Neue", sans-serif' }}>
                    GRIND<Box component="span" sx={{ color: 'primary.main' }}>.</Box>
                </Typography>
                <Typography sx={{ mt: 1, fontSize: 10, letterSpacing: '3.5px', fontWeight: 600, color: C.faint, whiteSpace: 'nowrap' }}>
                    POWERED BY <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>TREND</Box>
                </Typography>
            </Box>

            <Box component="nav" sx={{ flex: 1, overflowY: 'auto', px: 2 }}>
                {!isAffiliate && (
                    <>
                        {sectionLabel('Main')}
                        {menuItems.map(renderNavItem)}
                        {renderGroup('Clients', <PeopleOutlinedIcon fontSize="small" />, clientsOpen, () => setClientsOpen(!clientsOpen), clientItems)}
                        {renderGroup('Programs', <FitnessCenterIcon fontSize="small" />, plansOpen, () => setPlansOpen(!plansOpen), planItems)}
                    </>
                )}

                {sectionLabel('Business')}
                {businessItems
                    .filter((item) => !isAffiliate || item.path === '/admin/business/affiliate')
                    .map(renderNavItem)}
            </Box>

            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 3, border: `1px solid ${C.border}`, bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <Avatar sx={{ width: 38, height: 38, bgcolor: 'primary.main', color: '#fff', fontWeight: 700, fontSize: 16 }}>
                        {(username || 'A')[0].toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>{isAffiliate ? 'Affiliate' : 'Admin'}</Typography>
                        <Typography noWrap sx={{ fontSize: 12, color: C.muted }}>{username || 'Administrator'}</Typography>
                    </Box>
                    <IconButton size="small" aria-label="Account menu" onClick={(e) => setProfileAnchor(e.currentTarget)} sx={{ color: C.muted }}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={profileAnchor}
                    open={!!profileAnchor}
                    onClose={() => setProfileAnchor(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    slotProps={{ paper: { sx: { bgcolor: '#161616', border: `1px solid ${C.border}`, minWidth: 180 } } }}
                >
                    <MenuItem
                        onClick={() => { setProfileAnchor(null); navigate('/admin/login'); }}
                        sx={{ color: 'error.main', gap: 1.5, fontSize: 14, fontWeight: 600 }}
                    >
                        <LogoutIcon fontSize="small" /> Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: C.bg }}>
            <Box
                component="header"
                sx={{
                    position: 'fixed', top: 0, right: 0, zIndex: theme.zIndex.appBar,
                    left: { xs: 0, md: drawerWidth }, height: headerHeight,
                    display: 'flex', alignItems: 'center', gap: 1.5, px: { xs: 2, md: 5 },
                    bgcolor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
                    borderBottom: `1px solid ${C.border}`,
                }}
            >
                <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: 'none' }, color: C.text }}>
                    <MenuIcon />
                </IconButton>

                {isAffiliate ? (
                    <>
                        <Box sx={{ flex: 1 }} />
                        <Typography variant="body2" sx={{ color: C.muted }}>Affiliate Portal</Typography>
                    </>
                ) : (
                <>
                <Box
                    component="form"
                    onSubmit={submitSearch}
                    sx={{
                        flex: 1, maxWidth: 360, display: 'flex', alignItems: 'center', gap: 1.25,
                        px: 1.75, height: 44, borderRadius: 2.5,
                        bgcolor: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`,
                        '&:focus-within': { borderColor: 'rgba(255,92,53,0.5)' },
                    }}
                >
                    <SearchIcon fontSize="small" sx={{ color: C.muted }} />
                    <InputBase
                        inputRef={searchRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search clients..."
                        inputProps={{ 'aria-label': 'Search clients' }}
                        sx={{ flex: 1, fontSize: 14, color: C.text, '& input::placeholder': { color: C.muted, opacity: 1 } }}
                    />
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, px: 0.75, py: 0.1, borderRadius: 1, border: `1px solid ${C.border}`, fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>
                        {isMac ? '⌘K' : 'Ctrl K'}
                    </Box>
                </Box>

                <Box sx={{ flex: 1 }} />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/clients/create')}
                    sx={{ height: 44, px: { xs: 1.5, sm: 2.5 }, borderRadius: 2.5, fontWeight: 700, textTransform: 'none', fontSize: 15, boxShadow: 'none', whiteSpace: 'nowrap' }}
                >
                    New Client
                </Button>
                </>
                )}
            </Box>

            <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', bgcolor: C.sidebar },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', bgcolor: C.sidebar },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 5 }, mt: `${headerHeight}px`, width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, overflowX: 'hidden' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
