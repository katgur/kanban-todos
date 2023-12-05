import { useNavigate } from "react-router-dom"
import { backIcon } from "../utils/icons"

export function Header() {

    const navigate = useNavigate();

    const options = ['Комментарий', 'Описание', 'Тег'];
    const fullHeader = (
        <span className="header text-button" onClick={() => {navigate('/')}}>
            <span>
                {backIcon}
                Вернуться к задачам
            </span>
        </span>
    )
    const mainHeader = (
        <div className="header gap-20">
            {options.map((option) => {
                return (
                    <span key={option}>
                        <input type="checkbox" className="checkbox" />
                        {option}
                    </span>
                )
            })}
        </div>
    );

    console.log(window.location.href.includes('/full/'));
    return window.location.href.includes('/full/') ? fullHeader : mainHeader;
}