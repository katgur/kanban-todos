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

    const onClick = (event) => {
        console.log(event, event.target.options[0].selected)
        setSelected(names.filter((_, index) => event.target.options[index].selected === true))
    }

    return (
        <div className="tag-select">
            {selected && <TagList tags={selected} />}
            <div className="tag-select__content" onClick={() => setExpanded(!expanded)}>
                <div className="tag-select__header">
                    <div>Выбрать тег</div>
                    {arrowDown}
                </div>
                {
                    expanded &&
                    <select className="tag-select__options" {...register("tags")} onChange={onClick} multiple>
                        {names.map(name => {
                            return (
                                <option className="tag-select__option" key={name} value={name}>
                                    {name}
                                </option>
                            )
                        })}
                    </select>
                }
            </div>
        </div>
    )
}

export default TagSelect;