const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());


let rooms = [{
    roomid:1,
    seats:15,
    amenities:['Projector','Board','Wi-Fi'],
    pricePerHour:100
},
{
    roomid:2,
    seats:17,
    amenities:['Projector','Board','Wi-Fi'],
    pricePerHour:100
},

{
    roomid:3,
    seats:12,
    amenities:['Projector','Board','Wi-Fi'],
    pricePerHour:100
}
];

let booking=[{

Bookingid:'AA1',
BookingStatus:'Booked',
Bookingdate:'14-08-2023',
Customername:'Sharmila banu',
StartingTime: "11am",
EndTime:"2pm",
BookedDate:"19-08-2023"},

{

    Bookingid:'AA2',
    BookingStatus:'Booked',
    Bookingdate:'15-08-2023',
    Customername:'Shifath',
    StartingTime: "10am",
    EndTime:"3pm",
    BookedDate:"20-08-2023"},
];

// let customers=[{
  
//     Customername :'Sharmila banu',

//     Booking:[{

//         Bookingid:'AA1',
//         BookingStatus:'Booked',
//         Bookingdate:'14-08-2023',
//         Customername:'Sharmila banu',
//         StartingTime: "11am",
//         EndTime:"2pm",
//         BookedDate:"19-08-2023"}],
        


// },{
// Customername:'Shifath',

// Booking:[{Bookingid:'AA2',
// BookingStatus:'Booked',
// Bookingdate:'15-08-2023',
// Customername:'Shifath',
// StartingTime: "10am",
// EndTime:"3pm",
// BookedDate:"20-08-2023"}],}

// ]





app.get('/rooms',(req,res)=>{
    res.json(rooms);
});

app.get('/rooms/:id',(req,res)=>{

    const roomId = parseInt(req.params.id);
    const room = rooms.find((room)=> room.roomid === roomId);

    if(!room){
        return res.status(404).json({message:"Room not found"});
    }

    res.json(room);
})



app.post('/rooms',(req,res)=> {

    const newRoom=req.body;
    newRoom.roomid=rooms.length+1;
    rooms.push(newRoom);
    res.status(201).json(newRoom);
    
})

app.get('/bookings', (req, res) => {
    res.json(booking);
  });


app.get('/bookings/count/:customerName', (req, res) => {
    const customerName = req.params.customerName;
    const bookingCount = booking.filter(booking => booking.Customername === customerName).length;
    res.json({ customerName, bookingCount });
  });
  

  app.get('/api/rooms', (req, res) => {
    const roomsWithBookings = rooms.map(room => {
      const bookedData = booking.filter(booking => booking.roomId === room.id);
      return {
        ...room,
        bookings: bookedData,
      };
    });
  
    res.json(roomsWithBookings);
  });
  
  // Endpoint to create a booking
  app.post('/api/bookings', (req, res) => {
    const { roomId, customer, bookingDate, startTime, endTime } = req.body;
  
    // Generate a simple booking ID (replace with a better ID generation method)
    const bookingId = booking.length + 1;
  

    const newBooking = {
      bookingId,
      roomId,
      customer,
      bookingDate,
      startTime,
      endTime,
      status: 'booked',
      booked_On: new Date(),
    };
  
    booking.push(newBooking);
  
    res.status(201).json(newBooking);
  });





app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});