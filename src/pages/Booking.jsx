import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import ColorThief from 'colorthief';

const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

const getImageUrl = (relativePath) =>
  relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

const Booking = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ambientColor, setAmbientColor] = useState({
    hex: '#3498db',
    rgb: '52, 152, 219'
  });

  // Ref to the <img> in the DOM
  const posterRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${movieId}`);
        if (!res.ok) throw new Error('Movie not found');
        setMovie(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (!posterRef.current) return;
    const imgEl = posterRef.current;

    const extract = () => {
      try {
        const [r, g, b] = new ColorThief().getColor(imgEl);
        setAmbientColor({
          hex: rgbToHex(r, g, b),
          rgb: `${r}, ${g}, ${b}`
        });
      } catch {
        // fallback stays default
      }
    };

    if (imgEl.complete) {
      extract();
    } else {
      imgEl.onload = extract;
      imgEl.onerror = () => {
        console.error('Poster load failed');
      };
    }

    // clean up in case component unmounts
    return () => {
      imgEl.onload = null;
      imgEl.onerror = null;
    };
  }, [movie?.posterUrl]);

  if (loading) return <div className="booking-page">Loading...</div>;
  if (error)   return <div className="booking-page">{error}</div>;

  return (
    <div
      className="booking-page"
      style={{
        '--color-primary': ambientColor.hex,
        '--color-primary-rgb': ambientColor.rgb
      }}
    >
      <div className="movie-details-container">
        <div className="movie-details-card">
          <div className="movie-poster-container">
            <img
              ref={posterRef}
              src={getImageUrl(movie.posterUrl)}
              alt={`${movie.title} poster`}
              className="movie-poster-detail"
              crossOrigin="anonymous"
            />
          </div>
          <div className="movie-info-container">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <div className="movie-meta">
              <div className="genres-container">
                {movie.genres.map((g,i) => (
                  <span key={i} className="genre-tag">{g}</span>
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
