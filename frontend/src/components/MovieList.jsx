import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../redux/Slice/authSlice";
import { fetchMovies } from "../redux/Slice/movieSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  AppBar,
  Toolbar,
  Pagination,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const MovieList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const inputRef = useRef(null);
  const valueRef = useRef("asc");
  const [sortcate, setsortcate] = useState("");
  const [sortval, setsortval] = useState("asc");
  const [query, setQuery] = useState("");

  const { movies, totalPages, currentPage,status } = useSelector(
    (state) => state.movies
  );

  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);

  // Total number of pages
  const handlechangpage = (event, value) => {
    event.preventDefault();
    if (query !== "" && sortcate !== "") {
      let obj = {
        page: value,
        search: query,
        sortby: sortcate,
        orderbt: sortval,
      };
      dispatch(fetchMovies(obj));
      console.log(obj);
    } else if (sortcate !== "") {
      let obj = {
        page: value,
        sortby: sortcate,
        orderbt: sortval,
      };
      console.log(obj);
      dispatch(fetchMovies(obj));
    } else if (query !== "") {
      let obj = {
        page: value,
        search: query,
        sortby: null,
        orderbt: null,
      };
      console.log(obj);
      dispatch(fetchMovies(obj));
    } else {
      let obj = {
        page: value,
        sortby: null,
        orderbt: null,
      };
      console.log(obj);
      dispatch(fetchMovies(obj));
    }
  };

  //Logout
  const handlelogout = () => {
    dispatch(userlogout());
    navigate("/login");
  };

  //Search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(sortcate)
    if (sortcate !== "") {
      let obj = {
        search: query,
        page: 1,
        sortby: sortcate,
        orderbt: sortval,
      };
      dispatch(fetchMovies(obj));
    } else {
      let obj = {
        search: query,
        page: 1,
        sortby: null,
        orderbt: null,
      };
      dispatch(fetchMovies(obj));
    }
  };

  //Select  sortby
  const handleChange = (event) => {
    inputRef.current = event.target.value;
    let obj = {
      page: 1,
      search: query,
      sortby: inputRef.current,
      orderbt: sortval,
    };
    setsortcate(inputRef.current);

    dispatch(fetchMovies(obj));
  };

  //select sortby alphabetical
  const handleChanges = (event) => {
    valueRef.current = event.target.value;
    if (sortcate == "") {
      let obj = {
        page: 1,
        search: query,
        sortby: null,
        orderbt: null,
      };
      dispatch(fetchMovies(obj));
    } else {
      let obj = {
        page: 1,
        search: query,
        sortby: sortcate,
        orderbt: valueRef.current,
      };
      console.log(obj);
      setsortval(valueRef.current);
      dispatch(fetchMovies(obj));
    }
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const categoryLoading = new Array(13).fill(null)

  return (
    <div>
      <Box>
        <AppBar>
          <Toolbar>
            {/* Menu Icon */}

            {/* Navbar Title */}
            <Typography sx={{ flexGrow: 1 }}>
              Welcome To Movies World
            </Typography>

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
      </Box>
      <Box>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          mt={"60px"}
        >
          <form style={{ display: "flex" }} onSubmit={handleSearch}>
            <TextField
             
              placeholder="Searching...with name or description"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                width: "800px",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  px: 4,
                  py: 1.7,
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
                type="submit"
              >
                Search
              </Button>
            </Box>
          </form>
        </Box>
        <Box
          display={"flex"}
          gap={"20px"}
          justifyContent={"center"}
          mt={"20px"}
        >
          <FormControl sx={{ width: 200, maxWidth: "100%" }}>
            <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={sortby}
              label="Sortby"
              ref={inputRef}
              onChange={handleChange}
            >
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"rating"}>Rating</MenuItem>
              <MenuItem value={"release_date"}>Release Date</MenuItem>
              <MenuItem value={"duration"}>Duration</MenuItem>
              <MenuItem value={"description"}>Movie Details</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200, maxWidth: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              SortBy Alphabetical
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              ref={valueRef}
              label="AscDesc"
              onChange={handleChanges}
            >
              <MenuItem value={"asc"}>asc</MenuItem>
              <MenuItem value={"desc"}>desc</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {status=="loading"?<Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            padding: 2,
          }}
        >
          {categoryLoading.map((movie, index) => (
              <Card
                key={index}
                sx={{
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                {/* Image Section */}
                <CardMedia
                  
                  sx={{
                    width: { xs: "100%", sm: "100%" },
                    height: { xs: 300, sm: 400 },
                    animation:"pulse 2s infinite"
                  }}
                 
                />

                
              </Card>
            ))}
        </Box>:
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            padding: 2,
          }}
        >
          {movies &&
            movies?.map((movie, index) => (
              <Card
                key={movie._id}
                sx={{
                  width: 300,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                {/* Image Section */}
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: "100%" },
                    height: { xs: 200, sm: 300 },
                  }}
                  image={movie.imageurl}
                  alt={movie.name}
                />

                {/* Content Section */}
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent>
                    {/* Name */}
                    <Typography variant="h5" component="div" gutterBottom>
                      <div>{movie.name}</div>
                      <div style={{ fontSize: "14px", color: "red" }}>
                        ({movie.rating}/10)
                      </div>
                    </Typography>

                    {/* Year */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Release Year: {movie.release_date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Duration: {movie.duration}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="text.primary">
                      {movie.description}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
        </Box>}
        <Box style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlechangpage}
            color="primary"
            sx={{
              ".MuiPaginationItem-root": {
                borderRadius: "8px",
                padding: "10px",
                fontSize: "1.2rem",
                backgroundColor: "#f0f0f0",
                "&:hover": {
                  backgroundColor: "#ccc",
                },
                "&.mui-selected": {
                  backgroundColor: "blue",
                  color: "white",
                },
              },
              ".MuiPaginationItem-ellipsis": {
                color: "blue",
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default MovieList;
