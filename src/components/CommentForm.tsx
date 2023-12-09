import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { getDate } from "../utils";
import { Comment } from "../types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getTodoById } from "../features/todoSlice";
import fullStyle from "../style/full.module.css";

interface CommentFormData {
    content: string,
}

interface CommentFormProps {
    onSubmit: (comment: Comment) => void,
}

function CommentForm({ onSubmit }: CommentFormProps) {
    const { register, handleSubmit } = useForm<CommentFormData>();
    const params = useParams();
    const todo = useSelector(useMemo(() => getTodoById(params.id), [params.id]));

    if (!todo) {
        return;
    }

    return (
        <form onSubmit={handleSubmit((data: CommentFormData) => onSubmit({ id: uuid(), date: getDate(), content: data.content }))}>
            <textarea className={fullStyle.textarea} {...register("content")} />
            <button className={fullStyle.button} type="submit">
                Сохранить
            </button>
        </form>
    );
}

export default CommentForm;