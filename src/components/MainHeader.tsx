import { useRef } from "react";
import { Filter } from "../types";
import headerStyle from "../style/header.module.css";
import mainStyle from "../style/main.module.css";

interface MainHeaderProps {
    addFilter: (filter: Filter) => void,
    removeFilter: (filter: Filter) => void,
}

function MainHeader({ addFilter, removeFilter }: MainHeaderProps) {
    const filters = useRef(['comments', 'description', 'tags']);
    const options = useRef({ 'comments': 'Комментарий', 'description': 'Описание', 'tags': 'Тег' });

    const onInputChange = (e, filter: Filter) => {
        if (e.target.checked) {
            addFilter(filter);
        } else {
            removeFilter(filter);
        }
    }

    return (
        <header>
            <ul className={headerStyle.mainHeader}>
                {filters.current.map((filter) => {
                    return (
                        <li key={filter}>
                            <input type="checkbox" className={mainStyle.checkbox} onChange={(e) => onInputChange(e, filter)} />
                            {options.current[filter]}
                        </li>
                    )
                })}
            </ul>
        </header>
    );
}

export default MainHeader;