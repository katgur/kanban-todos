import { closeIcon, moreIcon, backIcon } from "../utils/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TagList from "../components/TagList"
import CommentSection from "../components/CommentSection"
import { Link } from "react-router-dom"
import { useState } from "react"
import { remove } from "../features/todoSlice"
import { deleteTodo } from "../data/todoApi"
import { Header } from "../components/Header"

function FullPage() {

    const [isMoreOpened, setIsMoreOpen] = useState(false);
    const [isDeleteOpened, setIsDeleteOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector(state => state.todo.data);

    const statusMap = ['Todo', 'In progress', 'Done'];

    const task = tasks.find(task => task.id === params.id);

    const header = (
        <>
            <div className="space-between">
                {statusMap[task.status]}
                <span onClick={() => setIsMoreOpen(true)}>{moreIcon}</span>
            </div>
            {isMoreOpened && (
                    <div className="card absolute-right">
                        <ul className="left">
                            <li className="text-button" onClick={() => {setIsDeleteOpen(true); setIsMoreOpen(false);}}>Удалить</li>
                            <li className="text-button"><Link to={`/edit/${task.id}`}>Редактировать</Link></li>
                        </ul>
                        <span className="right" onClick={() => setIsMoreOpen(false)}>{closeIcon}</span>
                    </div>
                )
            }
        </>
    );

    const children = [
        <>
            <div className="card">{task.name}</div>
            <div className={task.text ? "card" : "card disabled"}>{task.text ? task.text : "Описание"}</div>
            <TagList tags={task.tags} />
            <CommentSection />
            <div className="button">
                <Link to='/'>Сохранить</Link>
            </div>
        </>
    ];

    const onTaskRemove = () => {
        dispatch(remove(task));
        deleteTodo(task);
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
            <Header />
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