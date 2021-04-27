import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { readDeck } from "../../utils/api"
import CreateEditCardForm from "../Card/CreateEditCardForm"
import Breadcrumb from "../Common/BreadcrumbNav"

function AddCardScreen() {
    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        const loadDeck = async () => {
            const load = await readDeck(deckId, abortController.signal)
            setDeck(load)
        }

        loadDeck()

        return () => abortController.abort()
    }, [deckId])

    if(deck) {
        return (
            <div>
                <Breadcrumb crumbs={["Home", deck.name, "Add Card"]} />
                <h2>{deck.name}: Add Card</h2>
                <CreateEditCardForm />
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default AddCardScreen