import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { update } from '../features/todoSlice'
import { updateTodo } from '../data/todoService'
import React from 'react'
import { Status, Todo } from '../types'
import todoStyle from '../style/todo.module.css'

interface DropAreaProps {
    children: React.ReactNode,
    status: Status,
}

interface DropAreaItem {
    todo: Todo,
}

function DropArea({ children, status }: DropAreaProps) {
    const dispatch = useDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, drop] = useDrop(() => {
        return {
            accept: 'todo',
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
        <div ref={drop} className={todoStyle.taskList}>
            {children}
        </div>
    )
}

export default DropArea;