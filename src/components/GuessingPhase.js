import React, { useState, useEffect } from "react";
import InstructionsModal from "./InstructionsModal";
import "./style.css";
import { getRule } from "../evaluationFunctions";
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';


const GuessingPhase = () => {
    const navigate = useNavigate();
    const { sharedData, setSharedData } = useAppContext();

    // State to show instructions modal
    const [showInstructions, setShowInstructions] = useState(false);
    // Contents of input fields
    const [currentSequence, setCurrentSequence] = useState(["1", "2", "3"]);
    const [hypothesis, setHypothesis] = useState("Test hypothesis");
    // State to store guesses, comprised of sequences and hypotheses
    const [userGuesses, setUserGuesses] = useState([
        { sequence: [2, 4, 6], hypothesis: "(Initially provided match)", matchesRule: "TRUE✅" }
    ]);
    // TODO: Add a mechanism to select the rule
    const [currentRule, setCurrentRule] = useState("Increase by 1");
    // const [currentEvalFunction, setCurrentEvalFunction] = useState(getRule(currentRule));

    // State to show rule guessing content on the left panel
    const [isRuleGuessingOpen, setIsRuleGuessingOpen] = useState(false);

    // Change the current sequence upon input change
    const handleSequenceChange = (index, value) => {
        const newSequence = [...currentSequence];
        newSequence[index] = value;
        setCurrentSequence(newSequence);
    };

    // TODO: Implement rule guessing
    const openRuleGuessing = () => {
        // Set state to true to show rule guessing content on the left panel
        setIsRuleGuessingOpen(true);
    };

    // TODO: Implement sequence guessing
    const submitSequenceGuess = (event) => {
        event.preventDefault(); // Prevent form from submitting and refreshing the page

        // Ensure the currentEvalFunction is updated with the currentRule
        const rule = currentRule;
        const evalFunction = getRule(rule);

        // get current sequence
        const sequence = currentSequence;
        // convert to integers
        const sequenceInts = sequence.map(Number);

        // Call the current evaluation function with the current sequence and log the result
        const result = evalFunction(sequenceInts[0], sequenceInts[1], sequenceInts[2]);

        // Add the current sequence and hypothesis to the sequenceData state
        setUserGuesses([...userGuesses, { sequence: currentSequence.join(", "), hypothesis, matchesRule: result }]);

        // Empty the current sequence and hypothesis states
        setCurrentSequence(["", "", ""]);
        setHypothesis("");
    };

    // Implement submitFinalGuess
    const submitFinalGuess = (event) => {
        event.preventDefault();

        // Display a message to the user
        console.log("Final guess submitted");

        // Redirect to the feedback page
        // Ensure that the userGuesses state carries over to the feedback page
        // const { sharedData, setSharedData } = useAppContext();

        // const newUserGuesses = [...sharedData.userGuesses, { sequence: currentSequence.join(", "), hypothesis, matchesRule: result }];
        // setSharedData({ ...sharedData, userGuesses: newUserGuesses });

        // Opposed to the above 2 lines, I want the shared data to contain the userGuesses state, with no regard of previous states
        // setSharedData({ userGuesses: [...userGuesses] });
        setSharedData({ ...sharedData, userGuesses: userGuesses });


        // window.location.href = "/feedback";
        navigate("/feedback");

    };

    return (
        <div className="guessing-phase-container">
            {showInstructions && (
                <InstructionsModal onClose={() => setShowInstructions(false)} />
            )}
            <form onSubmit={isRuleGuessingOpen ? submitFinalGuess : submitSequenceGuess} className="left-panel">
                {!isRuleGuessingOpen ? (
                    <>
                        <div className="sequence-input-container">
                            <label>Test a sequence of three integers</label>
                            <div className="sequence-inputs">
                                {currentSequence.map((number, index) => (
                                    <input
                                        key={index}
                                        type="number"
                                        value={number}
                                        onChange={(e) =>
                                            handleSequenceChange(index, e.target.value)
                                        }
                                        required
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="hypothesis-input-container">
                            <label>What is the hypothesis for your sequence?</label>
                            <input
                                type="text"
                                value={hypothesis}
                                onChange={(e) => setHypothesis(e.target.value)}
                                required
                            />
                        </div>
                        <div className="buttons-container">
                            <button type="button" onClick={openRuleGuessing}>Guess the Rule!</button>
                            <button type="submit">
                                Test the Sequence!
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="rule-guessing-panel">
                        <div className="hypothesis-input-container">
                            <label>What is your guess for my rule?</label>
                            <input
                                type="text"
                                // value={currentRule}
                                // onChange={(e) => setCurrentRule(e.target.value)}
                                required
                            />
                        </div>
                        <div className="buttons-container">
                            <button type="submit">Submit Final Guess</button>
                            <button type="button" onClick={() => setIsRuleGuessingOpen(false)}>Actually, I want to test more sequences</button>

                        </div>
                    </div>
                )}
            </form>
            <div className="right-panel">
                <div className="grid">
                    <div className="sequence-output-value">
                        <div className="sequence-grid">
                            <div className="sequence-grid-item"><strong>#</strong></div>
                            <div className="sequence-grid-item"><strong>Sequence</strong></div>
                            <div className="sequence-grid-item"><strong>Hypothesis</strong></div>
                            <div className="sequence-grid-item"><strong>Matches Rule</strong></div>
                            {userGuesses.map((data, index) => (
                                <React.Fragment key={index}>
                                    <div className="sequence-grid-item">{index === 0 ? '-' : index}</div>
                                    <div className="sequence-grid-item">{data.sequence}</div>
                                    <div className="sequence-grid-item">{data.hypothesis}</div>
                                    <div className="sequence-grid-item">{data.matchesRule ? "TRUE✅" : "FALSE❌"}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuessingPhase;
