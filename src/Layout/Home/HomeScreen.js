import React from "react"
import { Route, Switch, Link } from "react-router-dom"
import DeckList from "./DeckList"
import NotFound from "../NotFound"
import StudyScreen from "../Study/StudyScreen"
import AddCardScreen from "../Card/AddCardScreen"
import DeckScreen from "../Deck/DeckScreen"
import EditDeckScreen from "../Deck/EditDeckScreen"
import EditCardScreen from "../Card/EditCardScreen"
import AddDeckScreen from "../Deck/AddDeckScreen"

function HomeScreen({ decks, handleDeleteDeck }) {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Link className="btn btn-secondary mb-2" to="/decks/new">+ Create Deck</Link>
                    <DeckList decks={decks} handleDeleteDeck={handleDeleteDeck} />
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <EditCardScreen />
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <AddCardScreen />
                </Route>
                <Route path="/decks/:deckId/study">
                    <StudyScreen />
                </Route>
                <Route path="/decks/:deckId/edit">
                    <EditDeckScreen />
                </Route>
                <Route path="/decks/new">
                    <AddDeckScreen />
                </Route>
                <Route path="/decks/:deckId">
                    <DeckScreen handleDeleteDeck={handleDeleteDeck}/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

export default HomeScreen