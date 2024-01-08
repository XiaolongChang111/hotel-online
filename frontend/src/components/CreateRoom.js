import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import http from '../http';
import { UsedRoomIds } from './UsedRoomIds';
import { BackButton } from './Back';

const CreateRoom = () => {
  const [roomData, setRoomData] = useState({
    roomId: '',
    status: 'available',
    price: '',
    capacity: '',
    type: 'Deluxe Room'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await http.post('/api/rooms', roomData);
      toast.success('Room created successfully');
      navigate('/admin'); 
    } catch (error) {
      toast.error(error.response.data.message || 'Error creating room');
    }
  };

  return (
    <div className="container my-5">
        <BackButton />
      <h2>Create Room</h2>
      <UsedRoomIds />  
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roomId" className="form-label">Room ID</label>
          <input
            type="text"
            className="form-control"
            id="roomId"
            name="roomId"
            value={roomData.roomId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={roomData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">Capacity</label>
          <input
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={roomData.type}
            onChange={handleChange}
            required
          >
            <option value='Deluxe Room'>Deluxe Room</option>
            <option value='Executive Suite'>Executive Suite</option>
            <option value='Family Suite'>Family Suite</option>
          </select>
          </div>
        <button type="submit" className="btn btn-primary">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoom;
