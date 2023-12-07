import { closeIcon, moreIcon, backIcon } from "../utils/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TagList from "../components/TagList"
import CommentSection from "../components/CommentSection"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { getTodoById, remove } from "../features/todoSlice"
import { deleteTodo } from "../data/todoApi"
import FullHeader from "../components/FullHeader"

function FullPage() {

    const [isMoreOpened, setIsMoreOpen] = useState(false);
    const [isDeleteOpened, setIsDeleteOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const todo = useSelector(useMemo(() => getTodoById(params.id), [params.id]));

    console.log(params, todo);
    const statusMap = ['Todo', 'In progress', 'Done'];


    const header = (
        <>
            <div className="space-between">
                {statusMap[todo.status]}
                <span onClick={() => setIsMoreOpen(true)}>{moreIcon}</span>
            </div>
            {isMoreOpened && (
                <div className="card absolute-right">
                    <ul className="left">
                        <li className="text-button" onClick={() => { setIsDeleteOpen(true); setIsMoreOpen(false); }}>Удалить</li>
                        <li className="text-button"><Link to={`/edit/${todo.id}`}>Редактировать</Link></li>
                    </ul>
                    <span className="right" onClick={() => setIsMoreOpen(false)}>{closeIcon}</span>
                </div>
            )
            }
        </>
    );

    const children = [
        <>
            <div className="card">{todo.name}</div>
            <div className={todo?.description ? "card" : "card disabled"}>{todo.description ? todo?.description : "Описание"}</div>
            <TagList tags={todo.tags} />
            <CommentSection todo={todo} />
        </>
    ];

    const onTaskRemove = () => {
        dispatch(remove(todo));
        deleteTodo(todo);
        navigate('/');
    };

    return (
        <>
            {isDeleteOpened && (
                <div className="card modal gray">
                    <div className="bold margin-10">Удалить тикет?</div>
                    <div className="space-between">
                        <span className="card text-button" onClick={onTaskRemove}>Да</span>
                        <span className="card text-button" onClick={() => setIsDeleteOpen(false)}>Нет</span>
                    </div>
                </div>
            )}
            <FullHeader />
            <div className="layout full-page">
                {header}
                <div className="task-list">
                    {children}
                </div>
            </div>
        </>
    )
}

export default FullPage;