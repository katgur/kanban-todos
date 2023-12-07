import { useRef } from "react";
import { Filter } from "../types";

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
        <div className="header gap-20">
            {filters.current.map((filter) => {
                return (
                    <span key={filter}>
                        <input type="checkbox" className="checkbox" onChange={(e) => onInputChange(e, filter)} />
                        {options.current[filter]}
                    </span>
                )
            })}
        </div>
    );
}

export default MainHeader;