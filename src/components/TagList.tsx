import todoStyle from '../style/todo.module.css'

interface TagListProps {
    tags: string[],
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
