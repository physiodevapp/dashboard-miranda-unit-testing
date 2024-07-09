
function checkDate(dateString) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const match = dateString.match(regex);

  const result = {
    isValid: true,
    error: null
  }

  if (!match) {
    result.error = new Error('Invalid date format. Please use dd/mm/yyyy.');
    result.isValid = false;
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);

  const date = new Date(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    result.error = new Error('Invalid date. Please check the day, month, and year.');
    result.isValid = false;
  }

  return result;
}


class Room {

  constructor({name, bookingList, rate, discount}) {
    this.name = name;
    this.bookingList = bookingList;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(dateString) {     
    const { isValid, error } = checkDate(dateString);

    if (isValid)
      return !!this.bookingList.find((booking) => (
        dateString >= booking.checkIn && 
        dateString < booking.checkOut
      ));  
    else 
      throw error
  };
}

class Booking {

  constructor({name, email, checkIn, checkOut, discount, room}) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

}





module.exports = {
  Room,
  Booking
}