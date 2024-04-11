import React, { useState, useEffect, useRef } from 'react';
import InstructionsModal from './InstructionsModal';
import { useAppContext } from '../AppContext';
import "./style.css";
// import { promptFile } from './feedbackPrompt.txt';

const FeedbackPhase = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const { sharedData } = useAppContext();
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(1); // Start with the second guess
  const [feedback, setFeedback] = useState([]); // State to store feedback for each guess


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

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      // This code runs only on the first render
      hasMounted.current = true;

      const fetchDisprovalFeedback = async () => {

        console.log('HELLO WORLD!');
    
        // const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Assuming you store your API key in .env
        const apiKey = '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';
    
        // Load text from feedbackPrompt.txt
        const instructions = await fetch("/feedbackPrompt.txt")
        .then((response) => response.text())
        .then((data) => {
            console.log('instruction data:', data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            // TODO: alert of error + cleanup execution
            return;
        });
    
        // Submit each guess number, the hypothesis, the sequence, and whether it the matches rule in a format that the AI can understand
        const prompt = sharedData.userGuesses.map((guess, index) => ({
          entryNumber: index,
          hypothesis: guess.hypothesis,
          sequence: guess.sequence,
          matchesRule: guess.matchesRule
        }));
    
        const promptStr = JSON.stringify(prompt);
        
        const jsonBody = {
          model: "gpt-4",
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: promptStr }
          ],
          temperature: 1,
          max_tokens: 700,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        };
    
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(jsonBody),
          });
    
          const data = await response.json();
          const apiResponse = data.choices[0].message.content.trim();
          console.log('apiResponse:', apiResponse);
          const disproveAttempts = JSON.parse(apiResponse);
          console.log('disproveAttempts:', disproveAttempts);
    
          setFeedback(disproveAttempts.map(attempt => attempt.disproveAttempt ? true : false));
        } catch (error) {
          console.error("Error:", error);
          alert("There was an error retrieving valid feedback from the AI model");
        }
      };

      fetchDisprovalFeedback();
    } else {
      console.log('already loaded feedback');
    }
  }, [sharedData.userGuesses]);

  // Generate the feedback text based on the current selectedGuessIndex
const renderFeedbackText = () => {
  if (selectedGuessIndex < 0 || selectedGuessIndex >= feedback.length) return null;

  const guess = sharedData.userGuesses[selectedGuessIndex];
  const guessNumString = selectedGuessIndex === 0 ? 'first' : 'next';
  const confirmationString = feedback[selectedGuessIndex] ? 'falsify' : 'confirm';
  const hypothesisMsg = feedback[selectedGuessIndex] ? 'that did NOT fit your hypothesis' : 'that fit your hypothesis';

  return (
    <>
      <p>Your {guessNumString} hypothesis was <strong>{guess.hypothesis}</strong>.</p>
      <p>Your {guessNumString} number sequence was <strong>{guess.sequence}</strong>.</p>
      <p>This sequence was an attempt to <strong>{confirmationString}</strong> your hypothesis.</p>
      <p>In other words, the number sequence you used was one <strong>{hypothesisMsg}</strong>.</p>
    </>
  );
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
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{index === 0 ? '-' : index}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{guess.sequence}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{guess.hypothesis}</div>
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{guess.matchesRule ? "TRUE✅" : "FALSE❌"}</div>
                  {/* If index 0, display "(NA)". Otherwise, display "Sequence FALSIFIES" if  feedback[index] is true and "Sequence CONFIRMS" if it is false */}
                  <div className={`sequence-grid-item ${index === selectedGuessIndex ? 'selected' : ''}`}>{index === 0 ? '(NA)' : ( feedback[index] ? "Sequence FALSIFIES" : "Sequence CONFIRMS")}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="feedback-content-right">
            {renderFeedbackText()}
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
