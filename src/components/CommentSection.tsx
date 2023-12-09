import { closeIcon, iconPlusGray } from "../utils/icons";
import { useState } from "react"
import { Comment, Todo } from "../types";
import CommentForm from "./CommentForm";
import { updateTodo } from "../data/todoService";
import { update } from "../features/todoSlice";
import { useDispatch } from "react-redux";
import fullStyle from "../style/full.module.css"

interface CommentSectionProps {
    todo: Todo,
}

function CommentSection({ todo }: CommentSectionProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const dispatch = useDispatch();

    const onSubmit = (comment: Comment) => {
        updateTodo({ ...todo, comments: [...todo.comments, comment] })
            .then((data: Todo) => {
                dispatch(update(data));
                setExpanded(false);
            })
            .catch(console.error)
    }

    return (
        <>
            <div className={fullStyle.subbutton} onClick={() => setExpanded(true)}>
                {iconPlusGray}
                <span className={fullStyle.subbuttonText}>
                    Добавить комментарий
                </span>
            </div>
            {todo.comments.map(comment => {
                return <div key={comment.id}>
                    <span className={fullStyle.date}>{comment.date}</span>
                    <span className={fullStyle.content}>{comment.content}</span>
                </div>
            })}
            {
                expanded &&
                <div>
                    <span className={fullStyle.fullCancel} onClick={() => setExpanded(false)}>
                        {closeIcon}
                    </span>
                    <CommentForm onSubmit={onSubmit} />
                </div>
            }
        </>
    );
}

export default CommentSection;