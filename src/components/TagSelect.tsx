import { ChangeEvent, useRef, useState } from "react"
import TagList from "./TagList"
import { arrowDown } from "../utils/icons"
import tagSelectStyle from "../style/tagSelect.module.css"
import todoStyle from '../style/todo.module.css'
import { UseFormRegister } from "react-hook-form"
import { Todo } from "../types"

interface TagSelectProps {
    defaultValue: string[] | undefined,
    register: UseFormRegister<Todo>,
}

function TagSelect({ defaultValue, register }: TagSelectProps) {
    const [selected, setSelected] = useState(defaultValue ? [...defaultValue] : []);
    const [expanded, setExpanded] = useState<boolean>(false);
    const tags = useRef(['violet', 'green', 'red', 'orange', 'cyan', 'lime', 'blue', 'yellow']);

    const onSelectChange = (e: ChangeEvent<HTMLInputElement>, tag: string) => {
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
                        {tags.current.map(tag => {
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