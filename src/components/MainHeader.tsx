import { useRef } from "react";
import { Filter } from "../types";
import headerStyle from "../style/header.module.css";

interface MainHeaderProps {
    addFilter: (filter: Filter) => void,
    removeFilter: (filter: Filter) => void,
}

function MainHeader({ addFilter, removeFilter }: MainHeaderProps) {
    const options = useRef({ 'comments': 'Комментарий', 'description': 'Описание', 'tags': 'Тег' });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, filter: Filter) => {
        if (e.target.checked) {
            addFilter(filter);
        } else {
            removeFilter(filter);
        }
    }

    return (
        <header>
            <ul className={headerStyle.mainHeader}>
                {Object.values(Filter).map(filter => {
                    return (
                        <li key={filter}>
                            <input type="checkbox" className="checkbox" onChange={(e) => onInputChange(e, filter)} />
                            {options.current[filter]}
                        </li>
                    )
                })}
            </ul>
        </header>
    );
}

export default MainHeader;