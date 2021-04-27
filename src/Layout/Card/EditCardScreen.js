import React, { useEffect, useState } from "react"
import { readDeck } from "../../utils/api"
import Breadcrumb from "../Common/BreadcrumbNav"
import CreateEditCardForm from "../Card/CreateEditCardForm"
import { useParams } from "react-router-dom"

function EditCardScreen() {
    const [deck, setDeck] = useState(null)
    const { deckId, cardId } = useParams()

    useEffect(() => {
        const abortController = new AbortController()

        const loadDeck = async () => {
            const loadedDeck = await readDeck(deckId, abortController.signal)
            setDeck(loadedDeck)
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId, cardId])

    if (deck) {
        const card = deck.cards.find((card) => `${card.id}` === cardId)
        return (
            <>
                <Breadcrumb crumbs={["Home", `Deck ${deck.name}`, `Edit Card ${cardId}`]} />
                <h2>Edit Card</h2>
                <CreateEditCardForm front={card.front} back={card.back} isEditing={true} />
            </>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default EditCardScreen