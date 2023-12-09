import { closeIcon, moreIcon } from "../utils/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TagList from "../components/TagList"
import CommentSection from "../components/CommentSection"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTodoById, remove, set } from "../features/todoSlice"
import { deleteTodo, getTodos } from "../data/todoService"
import FullHeader from "../components/FullHeader"
import Modal from "../components/Modal"
import { Point, Todo } from "../types"
import Popup from "../components/Popup"
import fullStyle from "../style/full.module.css"

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
    }, [dispatch])

    const params = useParams();
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
            <main className={fullStyle.full}>
                <div className={fullStyle.fullHeader}>
                    {statusMap[todo.status]}
                    <span onClick={(e) => setMorePoint({ x: e.clientX, y: e.clientY })}>{moreIcon}</span>
                </div>
                <Popup point={morePoint}>
                    <div className={fullStyle.card}>
                        <span className={fullStyle.fullCancel} onClick={() => setMorePoint(null)}>{closeIcon}</span>
                        <ul>
                            <li className={fullStyle.fullOption} onClick={() => { setIsDeleteOpen(true); setMorePoint(null); }}>Удалить</li>
                            <li className={fullStyle.fullOption}><Link to={`/edit/${todo.id}`}>Редактировать</Link></li>
                        </ul>
                    </div>
                </Popup>
                <div className={fullStyle.stack}>
                    <div className={fullStyle.card}>{todo.name}</div>
                    <textarea placeholder="Описание" className={fullStyle.card} readOnly>{todo.description}</textarea>
                    <TagList tags={todo.tags} />
                    <CommentSection todo={todo} />
                </div>
            </main>
            <Modal isVisible={isDeleteOpened}>
                <div className={fullStyle.modal}>
                    <div className={fullStyle.modalCard}>
                        <p className={fullStyle.deleteText}>Удалить тикет?</p>
                        <div className={fullStyle.options}>
                            <span onClick={onTaskRemove}>Да</span>
                            <span onClick={() => setIsDeleteOpen(false)}>Нет</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FullPage;