import { useState, useEffect } from 'react';

const CinemaHall = ({ movieId }) => {
  const rows = 8;
  const seatsPerRow = 10;
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const generatedSeats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        generatedSeats.push({
          id: `R${row}S${seatNum}`,
          row,
          number: seatNum,
          status: Math.random() > 0.5 ? 'booked' : 'available'
        });
      }
    }
    setSeats(generatedSeats);
  }, [movieId]);

  const handleSeatClick = (seatId) => {
    if (isConfirmed) return;
    
    const seat = seats.find(s => s.id === seatId);
    if (seat.status !== 'available') return;

    setSelectedSeats(prev => {
      const newSelection = new Set(prev);
      newSelection.has(seatId) ? newSelection.delete(seatId) : newSelection.add(seatId);
      return newSelection;
    });
  };

  const handleConfirm = () => {
    if (selectedSeats.size === 0) return;
    setIsConfirmed(true);
    console.log('Confirmed seats:', Array.from(selectedSeats));
    alert(`Seats ${Array.from(selectedSeats).join(', ')} confirmed!`);
  };

  const handleReset = () => {
    setSelectedSeats(new Set());
    setIsConfirmed(false);
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
                        className={`seat ${seat.status} ${
                          selectedSeats.has(seat.id) ? 'selected' : ''
                        } ${isConfirmed && selectedSeats.has(seat.id) ? 'confirmed' : ''}`}
                        onClick={() => handleSeatClick(seat.id)}
                        disabled={seat.status !== 'available' || isConfirmed}
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
          <p className="selection-status">
            {isConfirmed ? 'Booking confirmed!' : 'Please confirm your selection'}
          </p>
        </div>
        
        <div className="confirmation-buttons">
          {!isConfirmed ? (
            <button
              className="confirm-button"
              disabled={selectedSeats.size === 0}
              onClick={handleConfirm}
            >
              Confirm Selection
            </button>
          ) : (
            <button
              className="reset-button"
              onClick={handleReset}
            >
              Start New Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;