import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { add, update } from "../features/todoSlice"
import { addTodo, updateTodo } from '../data/todoService'
import TagSelect from "./TagSelect"
import { Status, Todo } from "../types"
import { v4 as uuid } from "uuid"
import todoStyle from '../style/todo.module.css'

interface TodoFormProps {
    todo: Todo | undefined,
}

function TodoForm({ todo }: TodoFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Todo>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (newTodo: Todo) => {
        if (!newTodo.tags) {
            newTodo.tags = todo?.tags ? todo.tags : [];
        }
        if (todo) {
            updateTodo({ ...todo, ...newTodo })
                .then((data: Todo) => {
                    dispatch(update(data));
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            addTodo({ ...newTodo, id: uuid(), status: Status.Created, comments: [] })
                .then((data: Todo) => {
                    dispatch(add(data));
                })
                .catch(err => {
                    console.error(err);
                })
        }
        navigate(-1);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={todoStyle.form}>
            <input className={todoStyle.formInput} defaultValue={todo?.name} {...register("name", { required: true })} />
            {errors.name && <span className={todoStyle.error}>Name is required</span>}
            <textarea className={todoStyle.formTextArea} defaultValue={todo?.description} {...register("description")} />
            <TagSelect defaultValue={todo?.tags} register={register} />
            <button className={todoStyle.button} type="submit">Готово</button>
        </form>
    )
}

export default TodoForm;