import { useState } from "react"
import TagList from "./TagList"
import { arrowDown } from "../utils/icons"

const names = ['violet', 'green', 'red', 'orange', 'light-blue', 'lime', 'blue', 'yellow']
const colors = {
    'violet': '#EEE1FD',
    'green': '#BAF8CF',
    'red': '#FED6CC',
    'orange': '#FFDCB6',
    'light-blue': '#B8E6FF',
    'lime': '#D8FCB0',
    'blue': '#C6D9FF',
    'yellow': '#FFF4C7'
}

function TagSelect({ defaultValue, register }) {
    const [selected, setSelected] = useState(defaultValue ? [...defaultValue] : []);
    const [expanded, setExpanded] = useState<boolean>(false);

    const onSelectChange = (e, tag) => {
        if (e.target.checked) {
            setSelected([...selected, tag]);
        } else {
            setSelected(selected.filter(s => s !== tag));
        }
    }

    return (
        <div className="tag-select">
            <TagList tags={selected} />
            <div className="tag-select__content" onClick={() => setExpanded(!expanded)}>
                <div className="tag-select__header">
                    <div>Выбрать тег</div>
                    {arrowDown}
                </div>
                <ul style={{ display: expanded ? "block" : "none" }} className="tag-select__options">
                    {names.map(name => {
                        return (
                            <li className="tag-select__option" key={name}>
                                <span style={{ display: "inline-block", backgroundColor: colors[name], width: 40, height: 18, borderRadius: 2 }}></span>
                                <input {...register("tags")} type="checkbox" className="checkbox" onChange={(e) => onSelectChange(e, name)} value={name} checked={selected.includes(name)} />
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}

export default TagSelect;