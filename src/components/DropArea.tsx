import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { update } from '../features/todoSlice'
import { updateTodo } from '../data/todoApi'
import React from 'react'
import { Status, Todo } from '../types'

interface DropAreaProps {
    children: React.ReactNode,
    status: Status,
}

function DropArea({ children, status }: DropAreaProps) {
    const dispatch = useDispatch();

    const [_, drop] = useDrop(() => {
        return {
            accept: 'task',
            drop: (todo: Todo) => {
                const newTask = { ...todo, status };
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
        <div ref={drop}>
            {children}
        </div>
    )
}

export default DropArea;