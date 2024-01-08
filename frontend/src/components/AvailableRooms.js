import React, { useState, useEffect } from 'react';
import http from '../http'; 
import { Link } from 'react-router-dom';
import Room1Example from '../assets/room1.jpg';
import Room2Example from '../assets/room2.jpg';
import Room3Example from '../assets/room3.jpg';


const RoomImage = {
    'Deluxe Room': Room1Example,
    'Executive Suite': Room2Example,
    'Family Suite': Room3Example,
}

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minCapacity: '',
    maxCapacity: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await http.get('/api/rooms/available');
      setRooms(response.data.filter(room => room.status === 'available'));
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRooms = rooms.filter(room => 
    (filters.minPrice ? room.price >= filters.minPrice : true) &&
    (filters.maxPrice ? room.price <= filters.maxPrice : true) &&
    (filters.minCapacity ? room.capacity >= filters.minCapacity : true) &&
    (filters.maxCapacity ? room.capacity <= filters.maxCapacity : true)
  )

  return (
    <div className="container my-5">
      <h2>Available Rooms</h2>
      <div className="mb-4 d-flex gap-5">
        <input
          className='form-control w-25'  
          type="number"
          placeholder="Min Price"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          className='form-control w-25'  
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <input
          className='form-control w-25'  
          type="number"
          placeholder="Min Capacity"
          name="minCapacity"
          value={filters.minCapacity}
          onChange={handleFilterChange}
        />
        <input
          className='form-control w-25'  
          type="number"
          placeholder="Max Capacity"
          name="maxCapacity"
          value={filters.maxCapacity}
          onChange={handleFilterChange}
        />
      </div>
      {filteredRooms.length === 0 && <p>No rooms found</p>}
      <div className="row">
        {filteredRooms.map(room => (
          <div key={room._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Room {room.roomId}</h5>
                <img src={RoomImage[room.type]} width={'100%'} alt={room.type}/>
                <p className="card-text">Price: ${room.price}</p>
                <p className="card-text">Capacity: {room.capacity}</p>
                <Link to={`book/${room._id}`} className="btn btn-primary">Book Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRooms;
