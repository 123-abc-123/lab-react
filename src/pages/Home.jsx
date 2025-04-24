import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        const data = await response.json();
        
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <h1 className="header">🎬 Movie Theater</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;