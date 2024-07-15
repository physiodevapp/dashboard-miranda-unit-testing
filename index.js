const checkDate = (dateString) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const match = dateString.match(regex);

  if (!match) {
    throw new Error("Invalid date format. Please use dd/mm/yyyy.");
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    throw new Error("Invalid date. Please check the day, month, and year.");
  }

  return date;
};

const getDatesBetween = (currentDate, lastDate) => {
  const dates = [];

  if (currentDate > lastDate) {
    throw new Error("End date must be after start date");
  }

  while (currentDate <= lastDate) {
    let options = {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const newDate = new Date(currentDate).toLocaleDateString("es-ES", options);
    dates.push(newDate);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

class Room {
  constructor({ name, bookingList, rate, discount }) {
    this.name = name;
    this.bookingList = bookingList;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(dateString) {
    try {
      checkDate(dateString);

      return this.bookingList.some(
        (booking) =>
          dateString >= booking.checkIn && dateString < booking.checkOut
      );
    } catch (error) {
      throw error;
    }
  }

  occupancyPercentage(startDateString, endDateString) {
    try {
      const betweenDates = [startDateString, endDateString].map((dateString) =>
        checkDate(dateString)
      );
      const currentDate = new Date(betweenDates[0]);
      const lastDate = new Date(betweenDates[1]);
      const dates = getDatesBetween(currentDate, lastDate);

      return Math.round(
        (dates
          .map((date) => this.isOccupied(date))
          .filter((isOccupied) => isOccupied === true).length /
          dates.length) *
          100
      );
    } catch (error) {
      throw error;
    }
  }

  static totalOccupancyPercentage(rooms, startDateString, endDateString) {
    try {
      const betweenDates = [startDateString, endDateString].map((dateString) =>
        checkDate(dateString)
      );
      const currentDate = new Date(betweenDates[0]);
      const lastDate = new Date(betweenDates[1]);
      const dates = getDatesBetween(currentDate, lastDate);

      const result = Math.round(
        (dates.reduce((occupiedDates, currentDate) => {
          rooms.forEach((room) => {
            if (
              room.isOccupied(currentDate) &&
              !occupiedDates.some(
                (occupiedDate) => occupiedDate === currentDate
              )
            )
            occupiedDates.push(currentDate);
          });

          return occupiedDates;
        }, []).length /
          dates.length) *
          100
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  static availableRooms(rooms, startDateString, endDateString) {
    try {
      const betweenDates = [startDateString, endDateString].map((dateString) =>
        checkDate(dateString)
      );
      const currentDate = new Date(betweenDates[0]);
      const lastDate = new Date(betweenDates[1]);
      const dates = getDatesBetween(currentDate, lastDate);

      return rooms.reduce((availableRooms, currentRoom) => {
        let availableDays = 0;
        
        dates.forEach((date) => {
          if (!currentRoom.isOccupied(date))
            availableDays++
        })
        
        if (availableDays === dates.length)
          availableRooms.push(currentRoom)

        return availableRooms;
      }, [])

    } catch (error) {
      throw error;
    }
  }
}

class Booking {
  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee() {
    if (this.discount < 0 || this.room.discount < 0)
      throw new Error("Invalid discount value")
    
    const roomDiscountRate = (100 - this.room.discount) * this.room.rate / 100;
    const finalRate = (100 - this.discount) * roomDiscountRate / 100;

    return finalRate;
  }
}

module.exports = {
  Room,
  Booking,
};
