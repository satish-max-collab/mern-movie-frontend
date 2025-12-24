import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext_old";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    API.get(`/movies/${id}`).then((res) => setMovie(res.data));
  }, [id]);

  const update = async () => {
    await API.put(`/movies/${id}`, movie, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate("/");
  };

  const remove = async () => {
    await API.delete(`/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      {Object.keys(movie).map(
        (key) =>
          key !== "_id" && (
            <TextField
              key={key}
              fullWidth
              margin="normal"
              label={key}
              value={movie[key]}
              onChange={(e) =>
                setMovie({ ...movie, [key]: e.target.value })
              }
            />
          )
      )}

      <Button variant="contained" onClick={update}>
        Update
      </Button>

      <Button color="error" onClick={remove} sx={{ ml: 2 }}>
        Delete
      </Button>
    </Container>
  );
};

export default AdminEditMovie;
