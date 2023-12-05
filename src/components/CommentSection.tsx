import { closeIcon, iconPlusGray } from "../utils/icons";
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

function CommentSection({ comments }) {
    const [_comments, _setComments] = useState(comments);

    const onAddClick = () => {
        _setComments([..._comments, {id: uuidv4(), name: "Имя", content: "Описание"}]);
    };

    return (
        <>
            {_comments && _comments.map(comment => {
                return <div key={comment.id}>
                    <span className="left">{comment.name}</span>
                    <span className="right">{closeIcon}</span>
                    <span className="left clear-left subtext">{comment.content}</span>
                </div>
            })}
            <div className="subbutton" onClick={onAddClick}>
                {iconPlusGray}
                Добавить комментарий
            </div>
        </>
    );
}

export default CommentSection;