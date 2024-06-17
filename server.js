const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        // Enviar el mensaje recibido a todos los clientes conectados
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log('Servidor WebSocket funcionando en ws://localhost:8080');
