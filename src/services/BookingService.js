const BOOKINGS_KEY = 'movieBookings';

export const BookingService = {
  getBookings() {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  },

  saveBooking(booking) {
    const bookings = this.getBookings();
    bookings.push({
      ...booking,
      id: Date.now().toString()
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },

  getBookedSeats(movieId) {
    return this.getBookings()
      .filter(b => b.movieId === movieId)
      .flatMap(b => b.seats);
  }
};