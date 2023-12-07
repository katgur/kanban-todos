import { closeIcon, iconPlusGray } from "../utils/icons";
import { useState } from "react"
import { Comment, Todo } from "../types";
import CommentForm from "./CommentForm";
import { updateTodo } from "../data/todoApi";
import { update } from "../features/todoSlice";
import { useDispatch } from "react-redux";

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
            <div className="subbutton" onClick={() => setExpanded(true)}>
                {iconPlusGray}
                Добавить комментарий
            </div>
            {todo.comments.map(comment => {
                return <div key={comment.id}>
                    <span className="left subtext">{comment.date}</span>
                    <span className="left clear-left">{comment.content}</span>
                </div>
            })}
            {
                expanded &&
                <div>
                    <span className="right" onClick={() => setExpanded(false)}>
                        {closeIcon}
                    </span>
                    <CommentForm onSubmit={onSubmit} />
                </div>
            }
        </>
    );
}

export default CommentSection;