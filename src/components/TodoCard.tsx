import TagList from './TagList'
import { Link } from 'react-router-dom'
import { moreIcon, alertIcon, commentIcon } from '../utils/icons'
import { useDrag } from 'react-dnd'
import { Todo } from '../types'
import todoStyle from "../style/todo.module.css"

export const ItemTypes = {
	TASK: 'task'
}

interface TodoCardProps {
	todo: Todo,
}

function TodoCard({ todo }: TodoCardProps) {
	const [_, drag] = useDrag(() => ({
		type: ItemTypes.TASK,
		item: { todo }
	}))

	return (
		<div className={todoStyle.todoCard} ref={drag}>
			<div className={todoStyle.todoCardContent}>
				<Link to={`edit/${todo.id}`}>
					<h3 className={todoStyle.todoTitle}>
						{todo.name}
					</h3>
				</Link>
				<TagList tags={todo.tags} />
			</div>
			<div className={todoStyle.todoCardInfo}>
				<span className={todoStyle.todoCardMore}>
					<Link to={`full/${todo.id}`}>{moreIcon}</Link>
				</span>
				<div className={todoStyle.todoCardIcons}>
					{todo.description &&
						<span>{alertIcon}</span>
					}
					{todo.comments && Boolean(todo.comments.length) &&
						<span>{commentIcon}</span>
					}
				</div>
			</div>
		</div>
	)
}

export default TodoCard;