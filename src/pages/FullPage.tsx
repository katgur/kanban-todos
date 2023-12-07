import { closeIcon, moreIcon } from "../utils/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TagList from "../components/TagList"
import CommentSection from "../components/CommentSection"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTodoById, remove, set } from "../features/todoSlice"
import { deleteTodo, getTodos } from "../data/todoApi"
import FullHeader from "../components/FullHeader"
import Modal from "../components/Modal"
import { Point, Todo } from "../types"
import Popup from "../components/Popup"

function FullPage() {
    const [morePoint, setMorePoint] = useState<Point | null>(null);
    const [isDeleteOpened, setIsDeleteOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getTodos([])
            .then((data: Todo[]) => {
                dispatch(set(data));
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    const params = useParams();

    if (params.id === undefined) {
        return <>Not Found</>;
    }

    const todo = useSelector(getTodoById(params.id));

    if (!todo) {
        return <>Not Found</>;
    }

    const statusMap = ['Todo', 'In progress', 'Done'];

    const onTaskRemove = () => {
        deleteTodo(todo)
            .then((data: Todo) => {
                dispatch(remove(data));
                navigate('/');
            })
            .catch(console.error)
    };

    return (
        <>
            <FullHeader />
            <div className="layout full-page">
                <div className="space-between">
                    {statusMap[todo.status]}
                    <span onClick={(e) => setMorePoint({ x: e.clientX, y: e.clientY })}>{moreIcon}</span>
                </div>
                <Popup point={morePoint}>
                    <div className="card clearfix">
                        <ul className="left">
                            <li className="text-button" onClick={() => { setIsDeleteOpen(true); setMorePoint(null); }}>Удалить</li>
                            <li className="text-button"><Link to={`/edit/${todo.id}`}>Редактировать</Link></li>
                        </ul>
                        <span className="right" onClick={() => setMorePoint(null)}>{closeIcon}</span>
                    </div>
                </Popup>
                <div className="task-list">
                    <div className="card">{todo.name}</div>
                    <div className={todo?.description ? "card" : "card disabled"}>{todo.description ? todo?.description : "Описание"}</div>
                    <TagList tags={todo.tags} />
                    <CommentSection todo={todo} />
                </div>
            </div>
            <Modal isVisible={isDeleteOpened}>
                <div className="modal">
                    <div className="card">
                        <div className="bold margin-10">Удалить тикет?</div>
                        <div className="space-between">
                            <span className="card text-button" onClick={onTaskRemove}>Да</span>
                            <span className="card text-button" onClick={() => setIsDeleteOpen(false)}>Нет</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FullPage;