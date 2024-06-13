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

const SignupForm = ({ onSignup }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!usernameRegex.test(username)) {
      newErrors.username =
        "Username must be 3-15 characters and can include letters, numbers, and underscores.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include at least one letter and one number.";
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (validate()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const isEmailUsed = existingUsers.some((user) => user.email === email);
      const isMobileUsed = existingUsers.some((user) => user.mobile === mobile);

      if (isEmailUsed || isMobileUsed) {
        const newErrors = {};
        if (isEmailUsed) {
          newErrors.email = "Email is already used. Use another email.";
        }
        if (isMobileUsed) {
          newErrors.mobile =
            "Mobile number is already used. Use another mobile number.";
        }
        setErrors(newErrors);
        return;
      }

      const newUser = { username, password, email, mobile };
      localStorage.setItem(
        "users",
        JSON.stringify([...existingUsers, newUser])
      );

      setTimeout(() => {
        onSignup(username);
        navigate("/");
      }, 1000);
    }
  };

  const handleSigninRedirect = () => {
    navigate("/signin"); // Navigate to the sign-in page
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
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
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Mobile No."
                name="mobile"
                autoComplete="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                error={!!errors.mobile}
                helperText={errors.mobile}
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
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Sign Up
              </Button>
            </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleSigninRedirect}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SignupForm;
