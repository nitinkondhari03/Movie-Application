import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container,AppBar,Toolbar } from "@mui/material";
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/Slice/authSlice";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
    alert("Register Successfully");
    navigate("/login");
  };

  return (
    <>
    <Box>
      <AppBar>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Welcome To Movies World</Typography>
        </Toolbar>
      </AppBar>
      </Box>
    <Box>
      <Container sx={{ width: 500, maxWidth: "100%" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <Typography variant="body2" mt={2}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Container>
      </Box>
    </>
  );
};

export default Register;
