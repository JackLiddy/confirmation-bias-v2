import React, { useState } from 'react';
import InstructionsModal from './InstructionsModal';
import { useAppContext } from '../AppContext';
import "./style.css";

const FeedbackPhase = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const { sharedData } = useAppContext();
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(1); // Start with the second guess

  const placeholderFeedback = "This is a placeholder feedback for the selected guess.";

  const handleNextGuess = () => {
    if (selectedGuessIndex < sharedData.userGuesses.length - 1) {
      setSelectedGuessIndex(selectedGuessIndex + 1);
    }
  };

  const handlePreviousGuess = () => {
    if (selectedGuessIndex > 0) {
      setSelectedGuessIndex(selectedGuessIndex - 1);
    }
  };

  return (
    <div className="feedback-phase-container">
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      <div className="rule-header">Rule Header</div>
      <div className="feedback-body">
        <div className="feedback-title">Here are my guesses as to which of your sequences were attempts to CONFIRM your hypothesis and which ones were attempts to FALSIFY your hypothesis.</div>
        <div className="feedback-content">
          <div className="feedback-content-left">
            <div className="sequence-grid feedback-grid">
              <div className="sequence-grid-item"><strong>#</strong></div>
              <div className="sequence-grid-item"><strong>Sequence</strong></div>
              <div className="sequence-grid-item"><strong>Hypothesis</strong></div>
              <div className="sequence-grid-item"><strong>Matches Rule</strong></div>
              <div className="sequence-grid-item"><strong>Confirm or Falsify</strong></div>
              {sharedData.userGuesses.map((guess, index) => (
                <React.Fragment key={index}>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{index + 1}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{guess.sequence}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{guess.hypothesis}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{guess.matchesRule}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}></div> {/* Placeholder for Confirm or Falsify */}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="feedback-content-right">
            {placeholderFeedback}
          </div>
        </div>
        <div className="buttons-container">
          <button onClick={handlePreviousGuess}>Previous Guess</button>
          <button onClick={handleNextGuess}>Next Guess</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPhase;
