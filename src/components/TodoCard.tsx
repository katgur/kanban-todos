import TagList from './TagList'
import { Link } from 'react-router-dom'
import { moreIcon, alertIcon, commentIcon } from '../utils/icons'
import { useDrag } from 'react-dnd'
import { Todo } from '../types'

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
		<div className="card clearfix" ref={drag}>
			<span className="left width-200">
				<span className="left wrap">
					<Link to={`edit/${todo.id}`}>
						{todo.name}
					</Link>
				</span>
				<TagList className="left clear-left" tags={todo.tags} />
			</span>
			<span className="right"><Link to={`full/${todo.id}`}>{moreIcon}</Link></span>
			{todo.description && <span className="right clear-right">{alertIcon}</span>}
			{todo.comments && Boolean(todo.comments.length) && <span className="right">{commentIcon}</span>}
		</div>
	)
}

export default TodoCard;