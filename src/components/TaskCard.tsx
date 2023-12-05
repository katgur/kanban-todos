import React, { useEffect } from 'react'
import TagList from './TagList'
import { Link } from 'react-router-dom'
import { moreIcon, alertIcon, commentIcon } from '../utils/icons'
import { useDrag } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { setTaskDragging } from '../features/todoSlice'
import { useRef } from 'react'

export const ItemTypes = {
    TASK: 'task'
}

function TaskCard({ task }) {
	const id = task.id;

	const editLink = `edit/${id}`;
	const fullLink = `full/${id}`;

	const dispatch = useDispatch();

	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.TASK,
		item: { id }
	  }))

    return (
		<div className="card" ref={drag}>
			<Link to={editLink}>			
				<span className="left width-200">
					<span className="left wrap">{task.name}</span>
					<TagList className="left clear-left" tags={task.tags} />
				</span>
				<span className="right"><Link to={fullLink}>{moreIcon}</Link></span>
				{task.text && <span className="right clear-right">{alertIcon}</span>}
				{task.comments && Boolean(task.comments.length) && <span className="right">{commentIcon}</span>}
			</Link>
        </div>
	)
}

export default TaskCard;