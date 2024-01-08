import { useEffect, useState } from "react"; 
import http from '../http';

export const UsedRoomIds = () => {
    const [rooms, setRooms] = useState([]);
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
    }, []);

    return (
        <div className="d-flex flex-wrap">
            {rooms.map(room => (
                <div key={room._id} className="badge bg-secondary me-2 mb-2">
                    {room.roomId}
                </div>
            ))}
        </div>
    )
};