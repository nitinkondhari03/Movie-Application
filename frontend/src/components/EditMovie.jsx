import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Container,AppBar,Toolbar } from "@mui/material";
import { editMovie,fetchMovies } from "../redux/Slice/movieSlice";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userlogout } from "../redux/Slice/authSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const EditMovie = () => {
  const { id } = useParams();
  const [name, setname] = useState("");
  const [rating, setrating] = useState("");
  const [release_date, setrelease_date] = useState("");
  const [duration, setduration] = useState("");
  const [description, setdescription] = useState("");
  const [imageurl, setimageurl] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleSubmits = (e) => {
    e.preventDefault();

    dispatch(
      editMovie({id,name, rating, release_date, duration, description, imageurl})
    );
    alert("Edit Movie successfully");
    dispatch(fetchMovies());
    navigate("/adminmovies")
    
  };
  const handledataid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/movies/${id}`
      );
     
      setname(response.data.data.name);
      setdescription(response.data.data.description);
      setduration(response.data.data.duration);
      setimageurl(response.data.data.imageurl);
      setrating(response.data.data.rating);
      setrelease_date(response.data.data.release_date);
    } catch (error) {
      console.log(error);
    }
  };
   const handlelogout = () => {
        dispatch(userlogout());
        navigate("/login");
      };
  useEffect(() => {
    handledataid();
  }, []);
  return (
    <div>
         <Box>
        <AppBar>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              Welcome To Movies World
            </Typography>

            <Box display={"flex"} gap={"20px"}>
              <Button style={{ textTransform: "lowercase" }} color="white">
                {user.email}
              </Button>
             
                <Link to={"/"}>
                  
                  <Button style={{ backgroundColor: "black", color: "white" }}>
                    Home
                  </Button>
                </Link>
                <Link to={"/adminmovies"}>
                  
                  <Button style={{ backgroundColor: "black", color: "white" }}>
                    Admin
                  </Button>
                </Link>
            
              <Button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handlelogout}
              >
                Logout
              </Button>
            </Box>
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
            Edit Movie
          </Typography>
          <form onSubmit={handleSubmits}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
            <TextField
              label="Rating"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              value={rating}
              required
              onChange={(e) => setrating(e.target.value)}
            />
            <TextField
              label="Release Date"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              required
              value={release_date}
              onChange={(e) => setrelease_date(e.target.value)}
            />
            <TextField
              label="Duration"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              placeholder="e.g., 2h 30m"
              required
              value={duration}
              onChange={(e) => setduration(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              required
              value={imageurl}
              onChange={(e) => setimageurl(e.target.value)}
            />

            <Button variant="contained" type="submit" color="primary" fullWidth>
              Edit Movie
            </Button>
          </form>
        </Box>
      </Container>
      </Box>
    </div>
  );
};

export default EditMovie;
