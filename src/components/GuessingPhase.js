import React, { useState, useEffect } from "react";
import InstructionsModal from "./InstructionsModal";
import "./style.css";
import { getRule } from "../evaluationFunctions";

const GuessingPhase = () => {
    // State to show instructions modal
    const [showInstructions, setShowInstructions] = useState(false);
    // Contents of input fields
    const [currentSequence, setCurrentSequence] = useState(["", "", ""]);
    const [hypothesis, setHypothesis] = useState("");
    // State to store guesses, comprised of sequences and hypotheses
    const [userGuesses, setUserGuesses] = useState([
        { sequence: "2, 4, 6", hypothesis: "(Initially provided match)", matchesRule: "TRUE✅" }
    ]);
    const [currentEvalFunction, setCurrentEvalFunction] = useState(getRule("Increase by 1"));

    // Change the current sequence upon input change
    const handleSequenceChange = (index, value) => {
        const newSequence = [...currentSequence];
        newSequence[index] = value;
        setCurrentSequence(newSequence);
    };

    // TODO: Implement rule guessing
    const openRuleGuessing = () => {
        console.log("Opening rule guessing");
    };

    // TODO: Implement sequence guessing
    const submitSequenceGuess = () => {
        // Add the current sequence and hypothesis to the sequenceData state
        setUserGuesses([...userGuesses, { sequence: currentSequence.join(", "), hypothesis }]);
        // Empty the current sequence and hypothesis states
        setCurrentSequence(["", "", ""]);
        setHypothesis("");
    };

    useEffect(() => {
        // console.log("Sequence input changed:", sequence);
        console.log(getRule("Increase by 1"));

        // Fetch the given function "Increase by 1"
        const currentEvalFunction = getRule("Increase by 1");
        // Call the function with the current sequence and log the result
        console.log(currentEvalFunction(1, 2, 3));
    }, [currentSequence]);

    return (
        <div className="guessing-phase-container">
            {showInstructions && (
                <InstructionsModal onClose={() => setShowInstructions(false)} />
            )}
            <div className="left-panel">
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
                    />
                </div>
                <div className="buttons-container">
                    <button onClick={openRuleGuessing}>Guess the Rule!</button>
                    <button onClick={submitSequenceGuess}>
                        Test the Sequence!
                    </button>
                </div>
            </div>
            <div className="right-panel">
                <div className="grid">
                    {/* <label>Sequence Grid here</label> */}
                    <div className="sequence-output-value">
                        {/* Display sequence data as a grid */}
                        <div className="sequence-grid">
                            {userGuesses.map((data, index) => (
                                <React.Fragment key={index}>
                                    <div className="sequence-grid-item">{index + 1}</div>
                                    <div className="sequence-grid-item">{data.sequence}</div>
                                    <div className="sequence-grid-item">{data.hypothesis}</div>
                                    <div className="sequence-grid-item">{data.matchesRule}</div>
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
