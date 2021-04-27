import React, { useState } from "react"
import { useHistory } from "react-router-dom"

function Card({ cards }) {
    const [index, setIndex ] = useState(0)
    const [isFrontSideUp, setIsFrontSideUp ] = useState(true)
    const history = useHistory()
    const { front, back } = cards[index]

    const totalCardCount = cards.length

    const handleNextCard = () => {
        setIsFrontSideUp((currentState) => !currentState);
        const newIndex = index + 1;
    
        if (newIndex >= cards.length) {
          const resetMessage = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
          if (resetMessage) {
            setIndex(0);
          } else {
            history.push("/");
          }
        } else {
          setIndex(newIndex);
        }
      };

      const handleFlipCard = () => {
        setIsFrontSideUp((currentState) => !currentState);
      };

    return (
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">{`Card ${index + 1} of ${totalCardCount}`}</h5>
            <p className="card-text">{isFrontSideUp ? front : back}</p>
            <button className="btn btn-secondary mr-2" onClick={handleFlipCard}>
              Flip
            </button>
    
            {!isFrontSideUp && (
              <button className="btn btn-primary" onClick={handleNextCard}>
                Next
              </button>
            )}
          </div>
        </div>
      )
    }
export default Card