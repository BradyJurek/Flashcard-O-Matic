import React from "react"
import Deck from "./Deck"

function List(props) {
    const { decks, handleDeleteDeck } = props

    return (
        <ul className="list-group">
            {decks.map((deck) => (
                <Deck name={deck.name} description={deck.description} cards={deck.cards} id={deck.id} key={deck.id} handleDeleteDeck={handleDeleteDeck}/>
            ))}
        </ul>
    )
}

export default List