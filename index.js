
class Room {

  constructor({name, bookingList, rate, discount}) {
    this.name = name;
    this.bookingList = bookingList;
    this.rate = rate;
    this.discount = discount;
  }


  isOccupied(date) {    
    return !!this.bookingList.find((booking) => (
      date >= booking.checkIn && 
      date < booking.checkOut
    ));      
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