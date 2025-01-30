import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../redux/Slice/authSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);

  const handlelogout = () => {
    dispatch(userlogout());
    navigate("/login");
  };

  return (
    <AppBar>
      <Toolbar>
        {/* Menu Icon */}

        {/* Navbar Title */}
        <Typography sx={{ flexGrow: 1 }}>Welcome To Movies World</Typography>

        {/* Navbar Buttons */}
        <Box display={"flex"} gap={"20px"}>
          <Button style={{ textTransform: "lowercase" }} color="white">
            {user.email}
          </Button>
          {role == "admin" && (
            <Link to={"/adminmovies"}>
              {" "}
              <Button style={{ backgroundColor: "black", color: "white" }}>
                Admin
              </Button>
            </Link>
          )}
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            onClick={handlelogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
