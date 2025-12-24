import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext_old";

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: "",
  });

  // ✅ FETCH MOVIE
  useEffect(() => {
    API.get(`/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(() => alert("Failed to load movie"));
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const updateMovie = async () => {
    try {
      await API.put(`/movies/${id}`, movie, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Movie updated successfully");
      navigate("/");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>Edit Movie</Typography>

      {Object.keys(movie).map((key) => (
        <TextField
          key={key}
          name={key}
          label={key}
          value={movie[key]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={updateMovie}
      >
        Update Movie
      </Button>
    </Container>
  );
};

export default AdminEditMovie;
