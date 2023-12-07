import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoById, update } from '../features/todoSlice'
import { updateTodo } from '../data/todoApi'
import React from 'react'
import { Status, Todo } from '../types'

interface DropAreaProps {
    children: React.ReactNode,
    status: Status,
}

interface DropAreaItem {
    todo: Todo,
}

function DropArea({ children, status }: DropAreaProps) {
    const dispatch = useDispatch();

    const [_, drop] = useDrop(() => {
        return {
            accept: 'task',
            drop: (item: DropAreaItem) => {
                const newTask = { ...item.todo, status };
                updateTodo(newTask)
                    .then((data: Todo) => {
                        dispatch(update(data));
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }
    }, []);

    return (
        <div ref={drop} className="task-list">
            {children}
        </div>
    )
}

export default DropArea;