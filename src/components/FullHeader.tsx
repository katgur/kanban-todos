import { useNavigate } from "react-router-dom"
import { backIcon } from "../utils/icons"

function FullHeader() {
    const navigate = useNavigate();

    return (
        <span className="header text-button" onClick={() => { navigate('/') }}>
            <span>
                {backIcon}
                Вернуться к задачам
            </span>
        </span>
    )
}

export default FullHeader;