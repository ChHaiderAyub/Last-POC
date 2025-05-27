import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  Divider,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom"; // ✅ Import Link & Outlet

const drawerWidth = 240;

const AdminDashboard = () => {
  const adminName = "Admin Name";

  const sidebarItems = [
    { label: "Users", path: "users" },
    { label: "Services", path: "services" },
    { label: "Add Services", path: "add-services" },
    { label: "View Services Requests", path: "service-requests" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Welcome at Admin Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: 2 }}>{adminName}</Typography>
            <Avatar alt={adminName} src="/admin-avatar.png" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
            borderRight: "1px solid #ddd",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path} // ✅ Use route path
                  sx={{
                    '&:hover': {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet /> {/* ✅ This will render nested routes like <Users /> */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
