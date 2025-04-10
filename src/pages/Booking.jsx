import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';

const Booking = () => {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === Number(movieId));

  if (!movie) {
    return <div className="booking-page">Movie not found</div>;
  }

  return (
    <div className="booking-page">
      <div className="movie-details-container">
        <div className="movie-details-card">
          <div className="movie-poster-container">
            <img 
              src={movie.posterUrl} 
              alt={`${movie.title} poster`} 
              className="movie-poster-detail"
            />
          </div>
          <div className="movie-info-container">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <div className="movie-meta">
              <div className="genres-container">
                {movie.genres.map((genre, index) => (
                  <span key={index} className="genre-tag">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="session-time">
                <span className="session-label">Session Time:</span>
                {new Date(movie.sessionTime).toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CinemaHall movieId={Number(movieId)} />
    </div>
  );
};

export default Booking;