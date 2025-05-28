import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GetAllUsersApi } from "../Api/agent";
import { User } from "../Models/User";

const roleMapping: Record<number, string> = {
  1: "Admin",
  2: "Service Provider",
  3: "Customer",
};

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await GetAllUsersApi();
      console.log("API Response:", response.data.entity);
      if (response.data.entity) {
        setUsers(response.data.entity);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom textAlign="center" mt={2}>
        All Users
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
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: "#d9d9d9",
                    },
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{roleMapping[user.role]}</TableCell>
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

export default AllUsers;
