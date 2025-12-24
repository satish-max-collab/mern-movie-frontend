import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        "https://mern-movie-backend-s4t0.onrender.com/api/auth/login",
        { email, password }
      );

      // Save user in Context (and localStorage internally)
      login(data);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" mb={3}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        {/* Browse without login */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2">
            Or{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/")}
            >
              continue to browse movies without login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
