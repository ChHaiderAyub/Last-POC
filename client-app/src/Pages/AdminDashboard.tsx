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
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

const AdminDashboard = () => {
  const adminName = "Admin Name";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
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
        <List>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="users">
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
  <ListItem disablePadding>
   <ListItemButton component={Link} to="/admin/service-providers">
  <ListItemText primary="Service Providers" />
</ListItemButton>

  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/admin/customers">
      <ListItemText primary="Customer" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="services">
      <ListItemText primary="Services" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="add-service">
      <ListItemText primary="Add Service" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="service-requests">
      <ListItemText primary="View Service Request" />
    </ListItemButton>
  </ListItem>
</List>

        <Divider />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
