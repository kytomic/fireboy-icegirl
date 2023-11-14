import { useState, useEffect } from 'react';
import { Socket } from './socket';

function App() {
  const webSocket = Socket();

  const sendMsg = () => {
    webSocket.connect();
  }

  return (
    <div className="App">
      <button onClick={sendMsg}>Connect</button>
    </div>
  );
}

export default App;
