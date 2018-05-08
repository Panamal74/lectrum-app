import io from 'socket.io-client';

const socket = io('https://lab.lectrum.io', {
    path: '/react/ws',
});

export { socket };
