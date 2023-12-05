import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { add, update } from "../features/todoSlice"
import { addTodo, updateTodo } from '../data/todoApi'
import TagSelect from "./TagSelect"
import { create, edit } from "../data/TodoFactory"

const items = [
    '#EEE1FD', 
    '#BAF8CF',
    '#FED6CC',
    '#FFDCB6',
    '#B8E6FF',
    '#D8FCB0',
    '#C6D9FF',
    '#FFF4C7'
  ]
const names = ['violet', 'green', 'red', 'orange', 'light-blue', 'lime', 'blue', 'yellow']
const colors = {
    'violet': '#EEE1FD', 
    'green': '#BAF8CF',
    'red': '#FED6CC',
    'orange': '#FFDCB6',
    'light-blue': '#B8E6FF',
    'lime': '#D8FCB0',
    'blue': '#C6D9FF',
    'yellow': '#FFF4C7'
  }

function Input({ task }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = data => {
        const tags = names.filter(name => {
            return data[name];
        });
        if (task) {
            const newTask = edit(task, data.name, data.text, tags)
            updateTodo(newTask);
            dispatch(update(newTask));
        } else {
            const newTask = create(data.name, data.text, tags);
            addTodo(newTask);
            dispatch(add(newTask));
        }

        navigate(-1);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="input-container">
            <textarea className="card height-22" defaultValue={task?.name} {...register("name", { required: true })} />
            {errors.name && <span>Name is required</span>}
            <textarea className="card height-100" defaultValue={task?.text} {...register("text")} />
            <TagSelect defaultValue={task?.tags} register={register} />
            <input className="button" type="submit" />
        </form>
    )
}

export default Input;