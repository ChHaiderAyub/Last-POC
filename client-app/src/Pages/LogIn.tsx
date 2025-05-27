import { Container, Box, Typography, Button, TextField, CircularProgress, Link } from "@mui/material";
import { Form, Formik } from "formik";
import { LogInFormValues, LogInInitialValues, LogInSchema } from "../Models/User";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { LogInUserApi } from "../Api/agent";

function LogIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

 const handleOnSubmit = async (values: LogInFormValues) => {
  setIsLoading(true);
  setErrorMessage("");
  console.log("Submitting values: ", values);
  try {
    const response = await LogInUserApi(values);
    console.log("response",response)
    if (response.status === 200 && response.data.entity) {
      const user = response.data.entity;
   

      if (user.role === 1) {
        navigate('/admin');
      } else if (user.role === 2) {
        navigate('/service-provider');
      } else if (user.role === 3) {
        navigate('/customer-home');
      } else {
        setErrorMessage("User role is not recognized.");
      }
    } else {
      setErrorMessage(response.data.message );
    }
  } catch (error: any) {
  const apiMessage = error?.response?.data?.message;

  if (error.response?.status === 404) {
    setErrorMessage(apiMessage || "Email not found.");
  } else if (error.response?.status === 401) {
    setErrorMessage(apiMessage || "Incorrect password.");
  } else {
    setErrorMessage(apiMessage || "Login failed. Please try again.");
  }
}
 finally {
    setIsLoading(false);
  }
};


  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>

        <Formik
          initialValues={LogInInitialValues}
          validationSchema={LogInSchema}
          onSubmit={handleOnSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.email && errors.email)}
                helperText={touched.email ? errors.email : ''}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(touched.password && errors.password)}
                helperText={touched.password ? errors.password : ''}
              />

              {errorMessage && (
                <Box mt={2}>
                  <Typography color="error">{errorMessage}</Typography>
                  <Typography variant="body2" mt={1}>
                    Don’t have an account?{" "}
                    <Link component={RouterLink} to="/register">
                      Register here
                    </Link>
                  </Typography>
                </Box>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ mt: 3 }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Log In"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default LogIn;

