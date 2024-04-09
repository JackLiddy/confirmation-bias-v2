import React from 'react';

const InstructionsModal = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ background: 'white', padding: 20 }}>
        <h2>Instructions</h2>
        <p>Here are the instructions for the guessing phase.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InstructionsModal;