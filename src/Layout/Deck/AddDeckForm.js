import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createDeck } from "../../utils/api"

function AddDeckForm() {
    const initialFormData = {
        name: "",
        description: "",
    }

    const history = useHistory()
    const [formData, setFormData] = useState({ ...initialFormData })

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await createDeck({ ...formData })
        history.push(`/decks/${result.id}`)
      }

    const handleChange = (event) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        }
        setFormData(newFormData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" id="name" name="name" type="text" aria-describedby="nameFormInput" onChange={handleChange} value={formData.name} />
            </div>
            <div>
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" name="description" aria-describedby="descriptionFormInput" onChange={handleChange} value={formData.description} className="form-control" />
            </div>
            <div className="mt-2">
                <Link to="/" className="btn btn-secondary mr-2">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default AddDeckForm