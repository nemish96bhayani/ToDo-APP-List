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

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!mobileNumber.trim() || !validateMobileNumber(mobileNumber)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Update password in localStorage (for demo purposes)
    localStorage.setItem("password", newPassword);
    navigate("/signin"); // Navigate to signin page after password update
  };

  const validateEmail = (email) => {
    // Simple email validation, adjust as per your requirements
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobileNumber = (number) => {
    // Simple mobile number validation, adjust as per your requirements
    return /^[0-9]{10}$/.test(number);
  };

  const handleSignInClick = () => {
    navigate("/signin");
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
              Forgot Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                autoComplete="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Re-enter Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Submit
              </Button>
              <Box sx={{ mt: 2 }} textAlign="center">
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleSignInClick}
                >
                  Sign In
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;
