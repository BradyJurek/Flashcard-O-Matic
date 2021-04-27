import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DeckDescription from "./DeckDescription"
import CardList from "../Card/CardList"
import Breadcrumb from "../Common/BreadcrumbNav"
import { readDeck } from "../../utils/api"

function DeckScreen({ handleDeleteDeck }) {
    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
    
        const loadDeck = async () => {
          const data = await readDeck(deckId, abortController.signal)
          setDeck(data)
        };
    
        loadDeck()
    
        return () => abortController.abort()
      }, [deckId])

    if (deck) {
        return (
            <div>
                <Breadcrumb crumbs={["Home", deck.name]} />
                <DeckDescription name={deck.name} description={deck.description} handleDeleteDeck={handleDeleteDeck} />
                <CardList cards={deck.cards} setDeck={setDeck} />
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default DeckScreen