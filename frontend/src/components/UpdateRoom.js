import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import http from '../http'; 
import { UsedRoomIds } from './UsedRoomIds';

const UpdateRoom = () => {
  const [roomData, setRoomData] = useState({
    roomId: '',
    status: '',
    price: '',
    capacity: ''
  });
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await http.get(`/api/rooms/${roomId}`);
        setRoomData(response.data);
      } catch (error) {
        toast.error('Error fetching room data');
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await http.put(`/api/rooms/${roomId}`, roomData);
      toast.success('Room updated successfully');
      navigate(-1);
    } catch (error) {
      toast.error(error.response.data.message || 'Error updating room');
    }
  };

  const isEditable = roomData.status === 'available';

  return (
    <div className="container my-5">
      <h2>Update Room</h2>
      <form onSubmit={handleSubmit}>
        <UsedRoomIds />
        <div className="mb-3">
          <label htmlFor="roomId" className="form-label">Room ID</label>
          <input
            type="text"
            className="form-control"
            id="roomId"
            name="roomId"
            value={roomData.roomId}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status"
            value={roomData.status}
            disabled
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
            disabled={!isEditable}
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
            disabled={!isEditable}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isEditable}>Update Room</button>
      </form>
    </div>
  );
};

export default UpdateRoom;
