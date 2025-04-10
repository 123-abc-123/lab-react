import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const genres = movie.genres || [];
  const displayedGenres = genres.slice(0, 2);
  const remainingGenres = genres.slice(2);
  const hasMoreGenres = genres.length > 2;

  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-details">
          <div className="genres-container">
            {displayedGenres.map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
            {hasMoreGenres && (
              <div className="genre-tooltip-container">
                <span className="genre-more">
                  +{genres.length - 2}
                </span>
                <div className="genre-tooltip">
                  {remainingGenres.map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span className="session-time">{movie.sessionTime}</span>
        </div>
        <Link to={`/booking/${movie.id}`} className="book-button">
          Book Tickets
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;