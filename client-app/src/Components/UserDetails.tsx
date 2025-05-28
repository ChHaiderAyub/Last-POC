import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetUserDetailsApi, DeleteUserApi } from "../Api/agent";
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
} from "@mui/material";

interface User {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: number;
  longitude?: string;
  latitude?: string;
}

const roleMapping: Record<number, string> = {
  1: "Admin",
  2: "Service Provider",
  3: "Customer",
};

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await GetUserDetailsApi(id!);
        if (response.data.entity) {
          setUser(response.data.entity);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await DeleteUserApi(id!); // Delete user by ID
      navigate("/admin/users"); // Navigate back to All Users page
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box mt={4} textAlign="center">
        <Typography variant="h6" color="error">
          User not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
      <Paper sx={{ p: 3, width: "100%", maxWidth: 600 }}>
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ mb: 2, borderBottom: "2px solid #1976d2", color: "#1976d2" }}
        >
          User Details
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow><TableCell><strong>Name</strong></TableCell><TableCell>{user.name}</TableCell></TableRow>
              <TableRow><TableCell><strong>Email</strong></TableCell><TableCell>{user.email}</TableCell></TableRow>
              <TableRow><TableCell><strong>Phone</strong></TableCell><TableCell>{user.phoneNumber}</TableCell></TableRow>
              <TableRow><TableCell><strong>Password</strong></TableCell><TableCell>{user.password}</TableCell></TableRow>
              <TableRow><TableCell><strong>Role</strong></TableCell><TableCell>{roleMapping[user.role]}</TableCell></TableRow>
              <TableRow><TableCell><strong>Longitude</strong></TableCell><TableCell>{user.longitude || "N/A"}</TableCell></TableRow>
              <TableRow><TableCell><strong>Latitude</strong></TableCell><TableCell>{user.latitude || "N/A"}</TableCell></TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" disabled>
            Edit (Coming Soon)
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserDetails;
