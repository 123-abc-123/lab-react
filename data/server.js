const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;

// Enable CORS for React development server
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's origin
    methods: ["GET"],
    allowedHeaders: "Content-Type,Authorization",
    exposedHeaders: "Content-Length,Content-Range",
  })
);

// app.use('/images', express.static('images'));
app.use("/images", express.static(path.join(__dirname, "images")));


const movies = [
  {
    id: 1,
    title: "The Matrix",
    description:
      "A computer programmer discovers a mysterious world of digital reality.",
    genres: ["Sci-Fi", "Action", "Martial Arts", "Drama", "Thriller"],
    posterUrl: "/images/matrix.png",
    sessionTime: "2023-08-15 19:30",
  },
  {
    id: 2,
    title: "Inception",
    description: "A thief who enters the dreams of others to steal secrets.",
    genres: ["Action", "Sci-Fi"],
    posterUrl: "/images/inception.png",
    sessionTime: "2023-08-15 21:00",
  },
  {
    id: 3,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    genres: ["Sci-Fi", "Drama"],
    posterUrl: "/images/interstellar.png",
    sessionTime: "2023-08-16 18:00",
  },
  {
    id: 4,
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
    genres: ["Action", "Crime"],
    posterUrl: "/images/the-dark-knight.png",
    sessionTime: "2023-08-16 20:30",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, and others intertwine in a tale of violence and redemption.",
    genres: ["Crime", "Drama"],
    posterUrl: "/images/pulp-fiction.png",
    sessionTime: "2023-08-17 19:00",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
    genres: ["Drama"],
    posterUrl: "/images/the-shawshank-redemption.png",
    sessionTime: "2023-08-17 21:30",
  },
];

// API endpoints
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
