import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { updateDeck } from "../../utils/api"

function EditDeckForm({ name="", description = "" }) {
    const initialFormData = {
        name: "",
        description: ""
    }
    const history = useHistory()
    const { deckId } = useParams()
    const [formData, setFormData] = useState({ ...initialFormData })

    useEffect(() => {
        setFormData({
            name,
            description
        })
    }, [name, description])

    const handleChange = (event) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        }
        setFormData(newFormData)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateDeck({ ...formData, id: deckId })
        history.goBack()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input name="name" id="name" aria-describedby="nameFormInput" className="form-control" onChange={handleChange} value={formData.name}></input>
            </div>
            <div>
                <label htmlFor="description" className="form-label">Description</label>
                <textarea name="description" id="description" aria-describedby="descriptionFormInput" className="form-control" onChange={handleChange} value={formData.description} />
            </div>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default EditDeckForm