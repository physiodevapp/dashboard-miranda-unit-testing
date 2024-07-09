
const { Room, Booking } = require('./index');

const bookingTemplate = { name: "Edu", email: "edu@email.com", discount: 10 };
const roomTemplate = { name: "Suite A", rate: 4, discount: 5 };

describe("Room tests", () => {

  test('Room is occupied', () => {    
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];

    const isOccupied = room.isOccupied("19/07/2024");

    expect(isOccupied).toBe(true);
  });

  test('Room is not occupied', () => {    
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];

    const isOccupied = room.isOccupied("20/07/2024");

    expect(isOccupied).toBe(false);
  });  

  test('Invalid date for isOccupied method', () => {    
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];



    expect(() => room.isOccupied("fdsafads")).toThrow()
  }); 
  
  test("Room occupancy percentage", () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];

    const occupancy = room.occupancyPercentage("08/07/2024", "18/07/2024");

    expect(occupancy).toBe(73);
  });

  test("Invalid range for occupancyPercentage method", () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];



    expect(() => room.occupancyPercentage("28/07/2024", "18/07/2024")).toThrow();
  });

  test("Invalid dates for occupancyPercentage method", () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];



    expect(() => room.occupancyPercentage("gfdgfds", "18/07/2024")).toThrow();
  });

});