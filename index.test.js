
const { Room, Booking } = require('./index');

const bookingTemplate = { name: "Edu", email: "edu@email.com", discount: 10 };
const roomTemplate = { name: "Suite A", rate: 18000, discount: 5 };

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

    const isOccupiedCallback = () => room.isOccupied("fdsafads")

    expect(isOccupiedCallback).toThrow()
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

    const occupancyCallback = () => room.occupancyPercentage("28/07/2024", "18/07/2024")

    expect(occupancyCallback).toThrow();
  });

  test("Invalid dates for occupancyPercentage method", () => {
    const room = new Room({...roomTemplate});
    const booking1 = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const booking2 = new Booking({...bookingTemplate, room, checkIn: "12/07/2024", checkOut: "20/07/2024"});
    room.bookingList = [booking1, booking2];

    const occupancyCallback = () => room.occupancyPercentage("gfdgfds", "18/07/2024")

    expect(occupancyCallback).toThrow();
  });

  test("Total occupancy between dates", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const totalOccupancy = Room.totalOccupancyPercentage([room1, room2], "08/07/2024", "15/07/2024");

    expect(totalOccupancy).toBe(75);
  });

  test("Invalid range of dates for total occupancy", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const totalOccupancyCallback = () => Room.totalOccupancyPercentage([room1, room2], "28/07/2024", "15/07/2024");

    expect(totalOccupancyCallback).toThrow();
  });

  test("Invalid dates for totalOccupancyPercentage method", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const totalOccupancyCallback = () => Room.totalOccupancyPercentage([room1, room2], "28/07/2024", "gfd07/2024");

    expect(totalOccupancyCallback).toThrow();
  });

  test("One available rooms", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const availableRooms = Room.availableRooms([room1, room2], "02/07/2024", "09/07/2024")

    expect(availableRooms.length).toBe(1);
  });

  test("None available rooms", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const availableRooms = Room.availableRooms([room1, room2], "02/07/2024", "14/07/2024")

    expect(availableRooms.length).toBe(0);
  });

  test("Invalid range of dates for available rooms", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const availableRoomsCallback = () => Room.availableRooms([room1, room2], "20/07/2024", "14/07/2024")

    expect(availableRoomsCallback).toThrow();
  });

  test("Invalid dates for availableRooms method", () => {
    const room1 = new Room({...roomTemplate});
    const room1Booking1 = new Booking({...bookingTemplate, room: room1, checkIn: "10/07/2024", checkOut: "13/07/2024"});
    const room1Booking2 = new Booking({...bookingTemplate, room: room1, checkIn: "15/07/2024", checkOut: "16/07/2024"});
    room1.bookingList = [room1Booking1, room1Booking2];

    const room2 = new Room({...roomTemplate, name: "Suite B"});
    const room2Booking1 = new Booking({...bookingTemplate, room: room2, checkIn: "09/07/2024", checkOut: "10/07/2024"});
    const room2Booking2 = new Booking({...bookingTemplate, room: room2, checkIn: "12/07/2024", checkOut: "14/07/2024"});
    room2.bookingList = [room2Booking1, room2Booking2];

    const availableRoomsCallback = () => Room.availableRooms([room1, room2], "20/07/2024", "14/gfd/2024")

    expect(availableRoomsCallback).toThrow();
  });

  test("Get booking fee", () => {
    const room = new Room({...roomTemplate});
    const booking = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});

    const discountRate = booking.getFee()

    expect(discountRate).toBe(15390)
  })

  test("Invalid room discount value", () => {
    const room = new Room({...roomTemplate, discount: -10});
    const booking = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024"});

    const discountRateCallback = () => booking.getFee();

    expect(discountRateCallback).toThrow();
  })

  test("Invalid booking discount value", () => {
    const room = new Room({...roomTemplate});
    const booking = new Booking({...bookingTemplate, room, checkIn: "09/07/2024", checkOut: "10/07/2024", discount: -10});

    const discountRateCallback = () => booking.getFee();

    expect(discountRateCallback).toThrow();
  })

});