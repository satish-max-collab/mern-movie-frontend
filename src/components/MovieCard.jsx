import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const formatDuration = (min) => (min ? `${Math.floor(min / 60)}h ${min % 60}m` : "N/A");

const MovieCard = ({ movie, user, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 280,
        mx: "auto",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardMedia
        component="img"
        image={movie.poster || "https://via.placeholder.com/300x450"}
        alt={movie.title}
        sx={{
          width: "100%",
          height: { xs: 220, sm: 260, md: 300 },
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ p: 1.5 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {movie.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ⭐ {movie.rating || "N/A"} &nbsp;|&nbsp; ⏱ {formatDuration(movie.duration)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          📅 {movie.releaseDate || "N/A"}
        </Typography>

        {user?.role === "admin" && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              size="small"
              variant="outlined"
              fullWidth
              onClick={() => navigate(`/admin/edit/${movie._id}`)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              fullWidth
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
