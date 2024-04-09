
import React, { useState } from 'react';
import InstructionsModal from './InstructionsModal';

const FeedbackPhase = () => {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div>
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      {/* Feedback phase content */}
    </div>

    // Below add the feedback phase
    
  );
};

export default FeedbackPhase;