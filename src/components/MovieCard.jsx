import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const formatDuration = (min) =>
  min ? `${Math.floor(min / 60)}h ${min % 60}m` : "N/A";

const MovieCard = ({ movie, user, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 200,
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": { transform: "scale(1.03)", transition: "0.3s" },
      }}
    >
      {/* Poster */}
      <Box sx={{ width: "100%", height: 300, overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={movie.poster || "https://via.placeholder.com/200x300"}
          alt={movie.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ p: 1 }}>
        <Typography variant="subtitle1" noWrap fontWeight="bold">
          {movie.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          ⭐ {movie.rating} | ⏱ {formatDuration(movie.duration)}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          📅 {movie.releaseDate}
        </Typography>

        {/* ✅ ADMIN ACTIONS */}
        {user?.role === "admin" && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(`/admin/edit/${movie._id}`)}
            >
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => onDelete(movie._id)}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
