import React from "react"
import { Link, useParams } from "react-router-dom"

function DeckDescription({ name, description, handleDeleteDeck }) {
    const { deckId } = useParams()

    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="justify-content-between d-flex">
                <div className="mb-3">
                    <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">Edit</Link>
                    <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">Study</Link>
                    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary">+Add Cards</Link>
                </div>
                <div>
                    <button className="btn btn-danger" onClick={() => handleDeleteDeck(deckId)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeckDescription