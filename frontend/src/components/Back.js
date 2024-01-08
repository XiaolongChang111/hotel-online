import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate();


    return (
        <button onClick={() => navigate(-1)} className="btn btn-primary">
            <i class="bi bi-arrow-left"></i>
            Back
        </button>
    )

}