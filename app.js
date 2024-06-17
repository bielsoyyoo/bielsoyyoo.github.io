document.addEventListener('DOMContentLoaded', (event) => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = function(event) {
        // Verificar si el mensaje es un Blob
        if (event.data instanceof Blob) {
            event.data.text().then(text => {
                const message = document.createElement('div');
                message.textContent = text;
                messagesContainer.appendChild(message);
            });
        } else {
            // Si no es un Blob, suponemos que es texto
            const message = document.createElement('div');
            message.textContent = event.data;
            messagesContainer.appendChild(message);
        }
    };

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        socket.send(message);
        messageInput.value = '';
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
