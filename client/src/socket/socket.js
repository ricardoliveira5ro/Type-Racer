import io from 'socket.io-client';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const socket = io.connect(URL);

export default socket;