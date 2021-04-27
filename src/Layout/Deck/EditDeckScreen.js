import React, { useEffect, useState } from "react"
import { readDeck } from "../../utils/api"
import { useParams } from "react-router-dom"
import EditDeckForm from "./EditDeckForm"
import Breadcrumb from "../Common/BreadcrumbNav"

function EditDeckScreen() {
    const [deck, setDeck] = useState(null)
    const { deckId } = useParams()

    useEffect(() => {
        const abortController = new AbortController();
    
        const loadDeck = async () => {
          const loaded = await readDeck(deckId, abortController.signal);
          setDeck(loaded);
        };

        loadDeck();
        return () => abortController.abort();
      }, [deckId]);

      if (deck) {
        return (
          <>
            <Breadcrumb crumbs={["Home", deck.name, "Edit Deck"]} />
            <h2>Edit Deck</h2>
            <EditDeckForm name={deck.name} description={deck.description} />
          </>
        );
      } else {
        return <p>Loading...</p>;
      }
    }

export default EditDeckScreen