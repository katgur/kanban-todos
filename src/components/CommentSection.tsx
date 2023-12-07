import { closeIcon, iconPlusGray } from "../utils/icons";
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Comment } from "../types";

interface CommentSectionProps {
    initialComments: Comment[]
}

function CommentSection({ initialComments }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([...initialComments]);

    const onAddClick = () => {
        setComments([...comments, { id: uuidv4(), name: "Имя", content: "Описание" }]);
    };

    return (
        <>
            {comments && comments.map(comment => {
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