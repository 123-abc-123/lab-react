import React, { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    const titleMatch = movie.title.toLowerCase().includes(lowerCaseSearchTerm);
    
    const genreMatch = movie.genres.some(genre => 
      genre.toLowerCase().includes(lowerCaseSearchTerm)
    );
    
    return titleMatch || genreMatch;
  });

  return (
    <div className="movie-list-container">
      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="no-results">No movies found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;