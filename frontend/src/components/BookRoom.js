import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '../http';
import { toast } from 'react-toastify';
import Room1Example from '../assets/room1.jpg';
import Room2Example from '../assets/room2.jpg';
import Room3Example from '../assets/room3.jpg';
import { BackButton } from './Back';
const RoomImage = {
    'Deluxe Room': Room1Example,
    'Executive Suite': Room2Example,
    'Family Suite': Room3Example,
}

const BookRoom = () => {
    const [guests, setGuests] = useState([{ name: '', birthday: '', phone: '', gender: '' }]);
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await http.get(`/api/rooms/${roomId}`);
                setRoom(response.data);
            } catch (error) {
                toast.error('Error fetching room data');
            }
        };
        fetchRoomData();
    }, [roomId])

    const handleGuestChange = (index, event) => {
        const updatedGuests = guests.map((guest, i) => {
            if (i === index) {
                return { ...guest, [event.target.name]: event.target.value };
            }
            return guest;
        });
        setGuests(updatedGuests);
    };

    const addGuest = () => {
        if (room && guests.length < room?.capacity) {
            setGuests([...guests, { name: '', birthday: '', phone: '', gender: '' }]);
        }
        
    };

    const removeGuest = (index) => {
        const updatedGuests = guests.filter((_, i) => i !== index);
        setGuests(updatedGuests);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const isAnyFieldEmpty = guests.some(guest =>
            !guest.name || !guest.birthday || !guest.phone || !guest.gender
        );

        if (isAnyFieldEmpty) {
            toast.error("Please fill in all fields for each guest.");
            return;
        }

        try {
            const response = await http.post('/api/orders', {
                room: roomId,
                customers: guests,
            });
            toast.success('Room booked successfully');
            navigate(`/customer/order/${response.data._id}`, { replace: true });
        } catch (error) {
            toast.error('Error booking room');
        }
    };

    if (!room) {
        return <>Loading..</>
    }

    return (
        <div className="container my-5">
            <BackButton />
            <h2>Book Room</h2>
            <img src={RoomImage[room.type]} width={'30%'} alt=''/>
            <form onSubmit={handleSubmit}>
                {guests.map((guest, index) => (
                    <div key={index} className="mb-3">
                        <h4>Guest {index + 1}</h4>
                        <div className='d-flex flex-wrap gap-3'>
                            <input
                                className='form-control w-25'
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={guest.name}
                                onChange={(e) => handleGuestChange(index, e)}
                            />
                            <input
                                className='form-control w-25'
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                value={guest.birthday}
                                onChange={(e) => handleGuestChange(index, e)}
                            />
                            <input
                                className='form-control w-25'
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={guest.phone}
                                onChange={(e) => handleGuestChange(index, e)}
                            />
                            <select
                                className='form-control w-25'
                                name="gender"
                                value={guest.gender}
                                onChange={(e) => handleGuestChange(index, e)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {index > 0 && (
                            <button type="button" className='btn btn-danger my-2' onClick={() => removeGuest(index)}>Remove Guest</button>
                        )}
                    </div>
                ))}
                <button type="button" className='btn btn-info me-3' onClick={addGuest}>Add Another Guest</button>

                <button type="submit" className='btn btn-primary'>Book Room</button>
            </form>
        </div>
    );
};

export default BookRoom;
