export interface BookingInterface {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;
}

export interface RoomInterface {
  name: string;
  rate: number;
  discount: number;
  bookingList: Booking[];
}


const checkDate = (dateString: string): Date => {
  const regex: RegExp = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const match: string[] | null = dateString.match(regex);

  if (!match) {
    throw new Error("Invalid date format. Please use dd/mm/yyyy.");
  }

  const day: number = parseInt(match[1], 10);
  const month: number = parseInt(match[2], 10) - 1;
  const year: number = parseInt(match[3], 10);

  const date: Date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    throw new Error("Invalid date. Please check the day, month, and year.");
  }

  return date;
};

const getDatesBetween = (currentDate: Date, lastDate: Date): string[] => {
  const dates: string[] = [];

  if (currentDate > lastDate) {
    throw new Error("End date must be after start date");
  }

  while (currentDate <= lastDate) {
    let options: {} = {
      timeZone: "Europe/Madrid",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const newDate: string = new Date(currentDate).toLocaleDateString("es-ES", options);
    dates.push(newDate);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export class Room {
  name: string;
  rate: number;
  discount: number;
  bookingList: BookingInterface[] | [];

  constructor({ name, bookingList, rate, discount }: RoomInterface) {
    this.name = name;
    this.bookingList = bookingList;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(dateString: string): boolean {
    try {
      checkDate(dateString);

      return this.bookingList.some(
        (booking: BookingInterface) =>
          dateString >= booking.checkIn && dateString < booking.checkOut
      );
    } catch (error) {
      throw error;
    }
  }

  occupancyPercentage(startDateString: string, endDateString: string): number {
    try {
      const betweenDates: Date[] = [startDateString, endDateString].map((dateString: string) =>
        checkDate(dateString)
      );
      const currentDate: Date = new Date(betweenDates[0]);
      const lastDate: Date = new Date(betweenDates[1]);
      const dates: string[] = getDatesBetween(currentDate, lastDate);

      return Math.round(
        (dates
          .map((date: string) => this.isOccupied(date))
          .filter((isOccupied: boolean) => isOccupied === true).length /
          dates.length) *
          100
      );
    } catch (error) {
      throw error;
    }
  }

  static totalOccupancyPercentage(rooms: Room[], startDateString: string, endDateString: string): number {
    try {
      const betweenDates: Date[] = [startDateString, endDateString].map((dateString: string) =>
        checkDate(dateString)
      );
      const currentDate: Date = new Date(betweenDates[0]);
      const lastDate: Date = new Date(betweenDates[1]);
      const dates: string[] = getDatesBetween(currentDate, lastDate);

      const result: number = Math.round(
        (dates.reduce((occupiedDates: string[], currentDate: string) => {
          rooms.forEach((room: Room) => {
            if (
              room.isOccupied(currentDate) &&
              !occupiedDates.some(
                (occupiedDate: string) => occupiedDate === currentDate
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

  static availableRooms(rooms: Room[], startDateString: string, endDateString: string) {
    try {
      const betweenDates: Date[] = [startDateString, endDateString].map((dateString: string) =>
        checkDate(dateString)
      );
      const currentDate: Date = new Date(betweenDates[0]);
      const lastDate: Date = new Date(betweenDates[1]);
      const dates: string[] = getDatesBetween(currentDate, lastDate);

      return rooms.reduce((availableRooms: Room[], currentRoom: Room) => {
        let availableDays: number = 0;
        
        dates.forEach((date) => {
          if (!currentRoom.isOccupied(date))
            availableDays = availableDays + 1;
        })
        
        if (availableDays === dates.length)
          availableRooms.push(currentRoom);

        return availableRooms;
      }, [])

    } catch (error) {
      throw error;
    }
  }
}

export class Booking {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;

  constructor({ name, email, checkIn, checkOut, discount, room }: BookingInterface) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee(): number {
    if (this.discount < 0 || this.room.discount < 0)
      throw new Error("Invalid discount value")
    
    const roomDiscountRate: number = (100 - this.room.discount) * this.room.rate / 100;
    const finalRate: number = (100 - this.discount) * roomDiscountRate / 100;

    return finalRate;
  }
}

module.exports = {
  Room,
  Booking,
};
