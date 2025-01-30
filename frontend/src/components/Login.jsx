import { Form, Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container,AppBar,Toolbar} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/authSlice";
import LoadingPage from "./LoadingPage";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then(() => {
        let token = localStorage.getItem("token");
        if (token == "undefined") {
          alert("Invalid credentials");
          return;
        }
        alert("Login Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

 
  return (
    <div>
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
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              required
              variant="outlined"
              margin="normal"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Typography variant="body2" mt={2}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Container>
      </Box>
    </div>
  );
};

export default Login;
