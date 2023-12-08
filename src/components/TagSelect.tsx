import { useState } from "react"
import TagList from "./TagList"
import { arrowDown } from "../utils/icons"
import todoStyle from "../style/todo.module.css"
import mainStyle from "../style/main.module.css"

const names = ['violet', 'green', 'red', 'orange', 'cyan', 'lime', 'blue', 'yellow']

function TagSelect({ defaultValue, register }) {
    const [selected, setSelected] = useState([...defaultValue]);
    const [expanded, setExpanded] = useState<boolean>(false);

    const onSelectChange = (e, tag) => {
        if (e.target.checked) {
            setSelected([...selected, tag]);
        } else {
            setSelected(selected.filter(s => s !== tag));
        }
    }

    return (
        <div>
            <TagList tags={selected} />
            <div className={todoStyle.tagSelectContent} onClick={() => setExpanded(!expanded)}>
                <div className={todoStyle.tagSelectHeader}>
                    <div>Выбрать тег</div>
                    {arrowDown}
                </div>
                {
                    expanded &&
                    <ul className={todoStyle.tagSelectOptions}>
                        {names.map(name => {
                            return (
                                <li className={todoStyle.tagSelectOption} key={name}>
                                    <div className={`${todoStyle.tag} ${todoStyle[name]}`}></div>
                                    <input {...register("tags")} type="checkbox" className={mainStyle.checkbox} onChange={(e) => onSelectChange(e, name)} value={name} checked={selected.includes(name)} />
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>

        </div>
    )
}

export default TagSelect;