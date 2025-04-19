import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../store/slices/messagesSlice';

const MessagesComponent = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.messages);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('El mensaje no puede estar vacío');
      return;
    }

    dispatch(sendMessage({ text: message, timestamp: Date.now() }));
    setMessage('');
  };

  return (
    <div>
      <h2>Mensajes</h2>
      {loading && <p>Cargando mensajes...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
      <div>
        <h3>Lista de Mensajes:</h3>
        {messages.length === 0 ? (
          <p>No hay mensajes disponibles.</p>
        ) : (
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                {msg.text} - {new Date(msg.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessagesComponent;