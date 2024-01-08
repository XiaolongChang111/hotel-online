import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../http'; 
import { toast } from 'react-toastify';

const RoomDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await http.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      
      }
    };

    fetchRooms();
  }, [reload]);

  const handleUpdate = (roomId) => {
    navigate(`update-room/${roomId}`); 
  };

  const handleDelete = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      http.delete(`/api/rooms/${roomId}`)
        .then(() => {
          setReload(!reload);
          toast.success('Room deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting room:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Room Dashboard</h2>
      <div>
        <button className="btn btn-primary" onClick={() => navigate('add-room')}>
            Create Room
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Status</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              <td>{room.roomId}</td>
              <td>
                <span className={`badge ${room.status === 'available' ? 'bg-success' : 'bg-danger'}`}>
                  {room.status}
                </span>
              </td>
              <td>{room.price}</td>
              <td>{room.capacity}</td>
              <td>
                <button 
                  className="btn btn-primary me-2" 
                  onClick={() => handleUpdate(room._id)} 
                  disabled={room.status !== 'available'}>
                  Update
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(room._id)} 
                  disabled={room.status !== 'available'}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomDashboard;
