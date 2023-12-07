import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { getDate } from "../utils";
import { Comment } from "../types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getTodoById } from "../features/todoSlice";

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
            <textarea {...register("content")} />
            <button className="button" type="submit">
                Сохранить
            </button>
        </form>
    );
}

export default CommentForm;