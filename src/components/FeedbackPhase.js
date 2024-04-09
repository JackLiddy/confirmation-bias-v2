import React, { useState } from 'react';
import InstructionsModal from './InstructionsModal';
import { useAppContext } from '../AppContext'; // Import useAppContext
import "./style.css";


/*
This is the feedback phase. It will show the user their guesses and the result of each guess.

Regarding the UI:
- There will be a header at the top of the screen, a rectangle taking up a third of the width, called the rule-header.
- Below the rule-header, there will be a section taking up the rest of the width, called the feedback-body.
- The feedback body will have some text at the top, called the feedback-title.
- Below the feedback-title, there will be a section taking up the rest of the page called the feedback-content.
- The feedback-content will be split into a left and right side.
  - On the left side, display a grid of the userGuesses. The current selected guess will be highlighted.
    - The grid should resemble the grid from the userGuesses page.
  - On the right side, display a few lines of text pertaining to the current selected guess, which are to be fetched from an API. (for now use a placeholder)

- Below the feedback-content, there will be several buttons.
  - A button to go to the previous guess.
  - A button to go to the next guess.

Regarding functionality:
  - On page load, the userGuesses array will be fetched from the AppContext and sent to an OPENAI API.
  - The OPENAI API will return a JSON object with feedback text associated with each of the userGuesses.
  - The feedback text corresponding to the current selected guess will be displayed in the feedback-content section.
  - For now, lets utilize a placeholder for the feedback text.

  - The initial selected and highlighted guess will be the second guess (row) in the userGuesses array.
  - Clicking the "Next Guess" button will highlight the next guess in the userGuesses array and display the corresponding feedback text fetched from the API.
  - Clicking the "Previous Guess" will do the opposite.
*/

const FeedbackPhase = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const { sharedData } = useAppContext(); // Use sharedData from AppContext


      // console log the sharedData.userGuesses
      console.log(sharedData.userGuesses);

  return (
    // Test code demonstrating how to get the userGuesses
    <div>
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
      {/* Feedback phase content */}
      {sharedData.userGuesses.map(guess => (
        <div key={guess.sequence}>{guess.sequence} - {guess.hypothesis}</div>
      ))}
    </div>
  );
};

export default FeedbackPhase;