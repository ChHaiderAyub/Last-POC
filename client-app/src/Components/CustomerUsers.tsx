import React, { useEffect, useState } from "react";
import { GetUsersByRoleApi } from "../Api/agent";
import {
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: number;
}

const CustomerUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await GetUsersByRoleApi("Customer");
        if (response.data.entity) {
          setUsers(response.data.entity);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom textAlign="center" mt={2}>
        Customer Users
      </Typography>

      <Box display="flex" justifyContent="center" mt={4}>
        <TableContainer
          component={Paper}
          sx={{
            width: "90%",
            maxWidth: 1000,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#009999" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#d9d9d9",
                    },
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                  <Button
                                       variant="outlined"
                                       color="info"
                                       size="small"
                                       component={Link}
                                       to={`/admin/users/details/${user.id}`}
                                     >
                                       Details
                                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CustomerUsers;
