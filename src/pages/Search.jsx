import React, { useState } from "react";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await API.get(`/movies/search?q=${query}`);
      setMovies(res.data);
    } catch (error) {
      console.error("Search failed:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      <TextField
        fullWidth
        label="Search by title or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={loading}
      >
        Search
      </Button>

      {loading && <Typography sx={{ mt: 2 }}>Searching...</Typography>}

      {!loading && movies.length === 0 && query && (
        <Typography sx={{ mt: 2 }}>
          No movies found
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {movies.map((movie) => (
          <Grid item key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
