import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { createCard, updateCard } from "../../utils/api"

function EditCardForm({ front="", back="", isEditing = false }) {
    const initialFormData = {
        front: "",
        back: ""
    }

    const { deckId, cardId } = useParams()
    const history = useHistory()
    const [formData, setFormData] = useState({ ...initialFormData })

    useEffect(() => {
        if (isEditing) {
            setFormData((currentData) => {
                return {
                    ...currentData,
                    front,
                    back
                }
            })
        }
    }, [back, front, isEditing])

    const handleChange = (event) => {
        const newData = {
            ...formData, 
            [event.target.name]: event.target.value
        }
        setFormData(newData)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isEditing) {
            await updateCard({...formData, id: Number(cardId), deckId: Number(deckId) })
            setFormData({ ...initialFormData })
            history.push(`/decks/${deckId}`)
        } else {
            await createCard(deckId, { ...formData })
            setFormData({ ...initialFormData })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="front" className="form=label">Front</label>
                <textarea 
                    className="form-control"
                    name="front"
                    aria-describedby="frontFormInput"
                    onChange={handleChange}
                    value={formData.front}
                    id="front"
                />
            </div>
            <div>
                <label>Back</label>
                <textarea
                    className="form-control"
                    name="back"
                    aria-describedby="backFormInput"
                    onChange={handleChange}
                    value={formData.back}
                    id="back" 
                />
            </div>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">Done</Link>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )
}

export default EditCardForm