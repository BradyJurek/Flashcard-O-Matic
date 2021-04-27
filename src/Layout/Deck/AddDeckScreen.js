import React from "react"
import Breadcrumb from "../Common/BreadcrumbNav"
import AddDeckForm from "./AddDeckForm"

function AddDeckScreen() {
    return (
        <div>
            <Breadcrumb crumbs={["Home", "Create Deck"]} />
            <h2>Create Deck</h2>
            <AddDeckForm />
        </div>
    )
}

export default AddDeckScreen