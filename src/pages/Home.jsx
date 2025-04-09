import MovieList from '../components/MovieList';
import { movies } from '../data/movies';

const Home = () => {
  return (
    <div className="app">
      <h1 className="header">🎬 Movie Theater</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;