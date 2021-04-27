import React from "react"
import { useParams } from "react-router-dom"
import CardDetails from "./CardDetails" 
import { deleteCard, readDeck } from "../../utils/api"

function CardList({ cards, setDeck }) {
    const { deckId } = useParams()

    const handleDeleteCard = async (id) => {
        const deleteMessage = window.confirm("Delete this card?\n\nYou will not be able to recover after deletion.")
        if (deleteMessage) {
            await deleteCard(id)
            const updatedDeck = await readDeck(deckId)
            setDeck(updatedDeck)
        }
    } 

    return (
        <div>
            <h2>Cards</h2>
            <ul className="list-group">
                {cards.map((card) => (
                    <CardDetails key={card.id} card={card} handleDeleteCard={handleDeleteCard} />
                ))}
            </ul>
        </div>
    )
}

export default CardList