import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { createCard, updateCard } from "../../utils/api"

function CreateEditCardForm({ front = "", back = "", isEditing = false }) {
    const initialFormData = {
        front: "",
        back: ""
    }

    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [formData, setFormData] = useState({ ...initialFormData })

    useEffect(() => {
        if (isEditing) {
            setFormData((currentFormData) => {
                return {
                    ...currentFormData,
                    front,
                    back
                }
            })
        }
    }, [front, back, isEditing])

    const handleSave = async (event) => {
        event.preventDefault()

        if (isEditing) {
            await updateCard({ ...formData, id: Number(cardId), deckId: Number(deckId) })
            setFormData({ ...initialFormData })
            history.push(`/decks/${deckId}`)
        } else {
            await createCard(deckId, { ...formData })
            setFormData({ ...initialFormData })
        }
    }

    const handleChange = (event) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        }
        setFormData(newFormData)
    }

    return (
        <form onSubmit={handleSave}>
            <div>
                <label htmlFor="front" className="form-label">Front</label>
                <textarea name="front" id="front" className="form-control" aria-describedby="frontFormInput" onChange={handleChange} value={formData.front} />
            </div>
            <div>
                <label htmlFor="back" className="form-label">Back</label>
                <textarea name="back" id="back" className="form-control" aria-describedby="backFormInput" onChange={handleChange} value={formData.back} />
            </div>
            <div className="mt-2">
                <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">Done</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    )
}

export default CreateEditCardForm