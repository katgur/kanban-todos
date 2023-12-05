import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { update } from '../features/todoSlice'
import { updateTodo } from '../data/todoApi'

 function DropArea({ children, destination }) {

    const tasks = useSelector(state => state.todo.data);
    const dispatch = useDispatch();

    const updateTask = (id) => {
        const task = tasks.filter((value, index, array) => {
            return value.id === id
        })[0];
        const newTask = {id: task.id, name: task.name, text: task.text, tags: task.tags, status: destination};
        dispatch(update(newTask));
        updateTodo(newTask);
    };

    const [{ isOver }, drop] = useDrop(() => {
        return {
            accept: 'task',
            drop: (item, monitor) => {
                updateTask(item.id);
            }
      }}, [tasks]);

    return (
        <div ref={drop}>
            {children}
        </div>
    )
 }

 export default DropArea;