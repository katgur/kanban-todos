import { useState } from "react"
import TagList from "./TagList"
import { arrowDown } from "../utils/icons"
import tagSelectStyle from "../style/tagSelect.module.css"
import todoStyle from '../style/todo.module.css'

const tags = ['violet', 'green', 'red', 'orange', 'cyan', 'lime', 'blue', 'yellow']

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
        <div>
            <TagList tags={selected} />
            <div className={tagSelectStyle.content}>
                <div className={tagSelectStyle.header} onClick={() => setExpanded(!expanded)}>
                    <div>Выбрать тег</div>
                    {arrowDown}
                </div>
                {
                    expanded &&
                    <ul className={tagSelectStyle.options}>
                        {tags.map(tag => {
                            return (
                                <li className={tagSelectStyle.option} key={tag}>
                                    <label className={`${todoStyle.tag} ${todoStyle[tag]}`}></label>
                                    <input {...register("tags")} type="checkbox" className="checkbox" onChange={(e) => onSelectChange(e, tag)} value={tag} checked={selected.includes(tag)} />
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