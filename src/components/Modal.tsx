import { useNavigate } from "react-router-dom"
import { closeIcon } from "../utils/icons"

function Modal({ children }) {
    const navigate = useNavigate();
    const onClose = () => { navigate(-1) };
    
     return <div className="modal card">
                    <div className="right" onClick={onClose}>
                        {closeIcon}
                    </div>
                    {children}
                </div>
}

export default Modal;