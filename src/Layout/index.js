import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api/index"
import Header from "./Header";
import HomeScreen from "../Layout/Home/HomeScreen";

function Layout() {
  const [decks, setDecks] = useState([])
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController()

    const loadDecks = async () => {
      const load = await listDecks(abortController.signal)
      setDecks(load)
    }

    loadDecks()

    return () => abortController.abort()
  }, [location])

  const handleDeleteDeck = async (deckId) => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    if(result) {
      await deleteDeck(deckId, new AbortController().signal)
      const data = await listDecks(new AbortController().signal)
      setDecks(data)
      history.push("/")
    }
  }
  return (
    <>
      <Header />
      <div className="container">
        <HomeScreen decks={decks} handleDeleteDeck={handleDeleteDeck}/>
      </div>
    </>
  );
}

export default Layout;
