import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-details">
          <span className="genre">{movie.genre}</span>
          <span className="session-time">{movie.sessionTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;