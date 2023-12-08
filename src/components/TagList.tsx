import todoStyle from '../style/todo.module.css'
import { Tag } from '../types'

interface TagListProps {
    tags: Tag[],
}

function TagList({ tags }: TagListProps) {
    return (
        <ul className={todoStyle.tagList}>
            {tags.map(tag => {
                return <li key={tag} className={`${todoStyle.tag} ${todoStyle[tag]}`}></li>
            })}
        </ul>
    )
}

export default TagList;
