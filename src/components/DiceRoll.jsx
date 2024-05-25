import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

// Replace 'http://localhost:3000' with the URL of your Express server
//const socket = io('http://localhost:3000');

export function DiceRoller () {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Listen for dice roll broadcasts from the server
    socket.on('diceRollBroadcast', (rolledNumber) => {
      setResult(rolledNumber);
    });

    // Cleanup the effect by removing the listener when the component unmounts
    return () => {
      socket.off('diceRollBroadcast');
    };
  }, []);

  const rollDie = () => {
    const rolledNumber = Math.floor(Math.random() * 6) + 1;
    socket.emit('diceRolled', rolledNumber);
  };

  return (
    <div>
      <h1>Dice Roller</h1>
      <button onClick={rollDie}>Roll the Die</button>
      {result && <p>You rolled: {result}</p>}
    </div>
  );
};