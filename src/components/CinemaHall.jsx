import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BookingService } from '../services/BookingService';

const CinemaHall = ({ movieId }) => {
  const rows = 8;
  const seatsPerRow = 10;
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initializeSeats = () => {
      const generatedSeats = [];
      for (let row = 1; row <= rows; row++) {
        for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
          generatedSeats.push({
            id: `R${row}S${seatNum}`,
            row,
            number: seatNum,
            status: 'available'
          });
        }
      }

      const bookedSeats = BookingService.getBookedSeats(movieId);
      setSeats(generatedSeats.map(seat => ({
        ...seat,
        status: bookedSeats.includes(seat.id) ? 'booked' : 'available'
      })));
    };

    initializeSeats();
  }, [movieId]);

  const handleSeatClick = (seatId) => {
    if (showForm) return;

    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status !== 'available') return;

    setSelectedSeats(prev => {
      const newSelection = new Set(prev);
      newSelection.has(seatId) ? newSelection.delete(seatId) : newSelection.add(seatId);
      return newSelection;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!userDetails.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (selectedSeats.size === 0) return;
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    BookingService.saveBooking({
      movieId,
      seats: Array.from(selectedSeats),
      user: userDetails,
      date: new Date().toISOString()
    });

    toast.success('Booking confirmed successfully!');
    setSelectedSeats(new Set());
    setShowForm(false);
    setUserDetails({ name: '', email: '', phone: '' });

    // Update seats status
    setSeats(prevSeats => prevSeats.map(seat =>
      selectedSeats.has(seat.id) ? { ...seat, status: 'booked' } : seat
    ));
  };

  const handleReset = () => {
    setSelectedSeats(new Set());
    setShowForm(false);
    setUserDetails({ name: '', email: '', phone: '' });
    setErrors({});
  };

  return (
    <div className="cinema-hall">
      <h2>Select your seats</h2>
      <div className="screen">SCREEN</div>

      <div className="cinema-grid-container">
        <div className="cinema-grid">
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const rowNumber = rowIndex + 1;
            return (
              <div key={rowNumber} className="cinema-row">
                <div className="row-label">R{rowNumber}</div>
                <div className="seats-row">
                  {seats
                    .filter(seat => seat.row === rowNumber)
                    .map(seat => (
                      <button
                        key={seat.id}
                        className={`seat ${seat.status} ${selectedSeats.has(seat.id) ? 'selected' : ''
                          }`}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.status !== 'available' || showForm}
                        title={`Row ${seat.row}, Seat ${seat.number}`}
                      >
                        {seat.number}
                      </button>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="selection-panel">
        <div className="selected-info">
          <h3>Selected Seats: {selectedSeats.size > 0
            ? Array.from(selectedSeats).join(', ')
            : 'None'}</h3>
          {showForm && (
            <div className="modal-overlay">
              <div className="modal-container">
                <form onSubmit={handleFormSubmit} className="booking-form light-theme">
                  <div className="modal-header">
                    <h3>Complete Your Booking</h3>
                    <button
                      type="button"
                      className="close-button"
                      onClick={handleReset}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                      className={`form-input ${errors.name ? 'error-input' : ''}`}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                      className={`form-input ${errors.email ? 'error-input' : ''}`}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                      className={`form-input ${errors.phone ? 'error-input' : ''}`}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-footer">
                    <p className="selected-seats-info">
                      Selected Seats: <strong>{Array.from(selectedSeats).join(', ')}</strong>
                    </p>
                    <div className="form-actions">
                      <button type="button" className="secondary-button" onClick={handleReset}>
                        Cancel
                      </button>
                      <button type="submit" className="primary-button">
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {!showForm && (
          <div className="confirmation-buttons">
            <button
              className="confirm-button"
              disabled={selectedSeats.size === 0}
              onClick={handleConfirm}
            >
              {selectedSeats.size > 0 ? 'Proceed to Booking' : 'Select Seats'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaHall;