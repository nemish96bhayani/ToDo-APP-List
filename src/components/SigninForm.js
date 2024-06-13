import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Link,
} from "@mui/material";

const SigninForm = ({ onSignin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = (event) => {
    event.preventDefault();

    // Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (storedUser) {
      setTimeout(() => {
        onSignin();
        navigate("/");
      }, 1000);
    } else {
      setError("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to the forgot password page
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 400, p: 2 }}>
          <CardContent>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSignin} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Sign In
              </Button>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Link>
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleSignupRedirect}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SigninForm;
