import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';

const Booking = () => {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === Number(movieId));

  return (
    <div className="booking-page">
      <h2>Booking for: {movie?.title}</h2>
      <CinemaHall movieId={Number(movieId)}/>
    </div>
  );
};

export default Booking;