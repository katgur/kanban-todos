import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { add, update } from "../features/todoSlice"
import { addTodo, updateTodo } from '../data/todoApi'
import TagSelect from "./TagSelect"
import { Status, Todo } from "../types"
import { v4 as uuid } from "uuid"

interface TodoFormProps {
    todo: Todo | null,
}

function TodoForm({ todo }: TodoFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Todo>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (newTodo: Todo) => {
        console.log(newTodo)
        if (todo) {
            updateTodo(newTodo)
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
        <form onSubmit={handleSubmit(onSubmit)} className="input-container">
            <input className="card" defaultValue={todo?.name} {...register("name", { required: true })} />
            {errors.name && <span>Name is required</span>}
            <textarea className="card height-100" defaultValue={todo?.description} {...register("description")} />
            <TagSelect defaultValue={todo?.tags} register={register} />
            <input className="button" type="submit" />
        </form>
    )
}

export default TodoForm;