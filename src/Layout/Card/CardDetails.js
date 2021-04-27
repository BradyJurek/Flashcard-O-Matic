import React from "react"
import { Link, useParams } from "react-router-dom"

function CardDetails({ card, handleDeleteCard }) {
    const { deckId } = useParams()
    const { front, back, id } = card

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col"><p>{front}</p></div>
                <div className="col"><p>{back}</p></div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-end">
                    <Link to={`/decks/${deckId}/cards/${id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDeleteCard(id)}>Delete</button>
                </div>
            </div>
        </li>
    )
}

export default CardDetails