import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (newMovie,thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/movies",
        newMovie,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async (updatedMovie, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/movies/${updatedMovie.id}`,
        updatedMovie,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/movies/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (obj, thunkAPI) => {
    let apiurl;
    if (obj == undefined) {
      apiurl = `http://localhost:8080/api/movies`;
    } else if (
      obj.sortby == null &&
      obj.orderbt == null &&
      obj.search == undefined
    ) {
      apiurl = `http://localhost:8080/api/movies?&page=${obj.page}`;
    } else if (
      obj.sortby !== null &&
      obj.orderbt !== null &&
      obj.search !== "" &&
      obj.search !== undefined
    ) {
      apiurl = `http://localhost:8080/api/movies?search=${obj.search}&page=${obj.page}&sortBy=${obj.sortby}&order=${obj.orderbt}`;
    } else if (obj.sortby !== null && obj.orderbt !== null) {
      apiurl = `http://localhost:8080/api/movies?page=${obj.page}&sortBy=${obj.sortby}&order=${obj.orderbt}`;
    } else if (obj.search !== undefined) {
      apiurl = `http://localhost:8080/api/movies?search=${obj.search}&page=${obj.page}`;
    } else {
      apiurl = `http://localhost:8080/api/movies`;
    }
    try {
      const response = await axios.get(apiurl);
      let x = response.data;
      return {
        data: x.data,
        totalPages: x.totalPages,
        currentPage: x.currentPage,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalPages: 1,
    currentPage: 1,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Movie
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      // Edit Movie
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      // Delete Movie
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        );
      });
  },
});

export default moviesSlice.reducer;
