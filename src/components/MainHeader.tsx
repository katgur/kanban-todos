import { useRef } from "react";

function MainHeader() {
    const options = useRef(['Комментарий', 'Описание', 'Тег']);

    return (
        <div className="header gap-20">
            {options.current.map((option) => {
                return (
                    <span key={option}>
                        <input type="checkbox" className="checkbox" />
                        {option}
                    </span>
                )
            })}
        </div>
    );
}

export default MainHeader;