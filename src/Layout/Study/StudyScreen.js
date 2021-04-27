import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { readDeck } from "../../utils/api"
import Breadcrumb from "../Common/BreadcrumbNav"
import NotEnoughCards from "./NotEnoughCards"
import Card from "./Card"

function StudyScreen() {
    const [deck, setDeck] = useState(null)
    const { deckId } = useParams()

    useEffect(() => {
        const abortController = new AbortController()

        const loadDeck = async () => {
            const load = await readDeck(deckId, abortController.signal)
            setDeck(load)
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId])

    if (deck) {
        return (
            <div>
                <Breadcrumb crumbs={["Home", deck.name, "Study"]} />
                <h2>Study: {deck.name}</h2>
                {deck.cards.length > 2 ? <Card cards={deck.cards} /> : <NotEnoughCards deck={deck} />}
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default StudyScreen