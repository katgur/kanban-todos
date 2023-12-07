import { useNavigate } from "react-router-dom"
import { backIcon } from "../utils/icons"
import headerStyle from "../style/header.module.css"

function FullHeader() {
    const navigate = useNavigate();

    return (
        <header className={headerStyle.fullHeader} onClick={() => { navigate('/') }}>
            {backIcon}
            <span>
                Вернуться к задачам
            </span>
        </header>
    )
}

export default FullHeader;