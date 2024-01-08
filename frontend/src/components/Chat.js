import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../Auth';
import http from '../http';

const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL;

const ChatComponent = () => {
    const [usernames, setUsernames] = useState([]);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const { user } = useAuth();
    const [target, setTarget] = useState('');
    const [reloadUserNames, setReloadUsernames] = useState(false);
    useEffect(() => {
        let newSocket = null;
        if (user) {
            newSocket = io(SOCKET_SERVER_URL);
            setSocket(newSocket);
            newSocket.on('connect', () => {
                newSocket.emit('confirm-user', user.username);
                if (user.isAdmin) {
                    newSocket.emit('admin-connected');
                }
            });
            newSocket.on('chat-message', msg => {
                console.log(msg);
                setChatMessages(prev => [...prev, JSON.parse(msg)]);
                if (user?.isAdmin) {
                    setReloadUsernames(!reloadUserNames);
                }
            });
        }

        return () => newSocket?.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (user?.isAdmin) {
            http.get('/api/users/usernames')
                .then(response => {
                    setUsernames(response.data);
                    if (response.data.length > 0) {
                        setTarget(response.data[0]);
                    }
                })
        }
    }, [user]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chat-message', JSON.stringify({ origin: user?.isAdmin ? 'admin' : user?.username, target: target, message }));
            setChatMessages(prev => [...prev, {
                origin: 'You',
                message: message
            }]);
            setMessage('');
        }
    };

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5, width: '25vw' }}>
            <div className="card">
                <div className="card-header">Chat</div>
                <div className="card-body">
                    <div className="chat-messages" style={{ height: '200px', overflowY: 'scroll' }}>
                        {chatMessages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.origin}: </strong>
                                {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-footer d-flex align-items-center">
                    {user?.isAdmin && (
                        <select 
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="form-select me-2" style={{ width: '100px' }}>
                            {usernames.map(username => (
                                <option key={username}>{username}</option>
                            ))}
                        </select>
                    )}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="btn btn-primary mt-2">Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
