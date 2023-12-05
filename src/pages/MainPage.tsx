import TaskCard from '../components/TaskCard'
import { Link, Outlet } from 'react-router-dom'
import { iconPlus } from '../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCard from '../components/EmptyCard'
import { getTodos } from '../data/todoApi'
import { useRef } from 'react'
import { set } from "../features/todoSlice"
import DropArea from '../components/DropArea'
import { Header } from '../components/Header'

function MainPage() {
    const isDataLoaded = useRef(false);
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todo.data);

    const fetchData = async() => {
        if (!isDataLoaded.current) {
            const tasks = await getTodos();
            dispatch(set(tasks));
            isDataLoaded.current = true;
        }
    }

    const mapAndFilterTasks = function(status) {
        const filtered = todos.filter((value, index, array) => {
            return value.status === status
        });
        if (!filtered.length) {
            return <EmptyCard />
        }
        return filtered.map(task => {
            return <TaskCard key={task.id} task={task} />
        });
    }

    const createTicketLink = <Link to='/create'>{iconPlus}Добавить тикет</Link>
    const createTicketButton = <div className="button" key="button">{createTicketLink}</div>

    const setup = () => {
        const statusMap = ['Todo', 'In progress', 'Done']
        fetchData().catch(console.error);
        return [0, 1, 2].map(value => {
            let children = mapAndFilterTasks(value);
            if (value < 1) {
                children = [children, createTicketButton];
            }
            return {header: statusMap[value], children: children};
        })
    };

    const boardList = setup();

    return (
        <>
            <Header />
            <div className="board-list">
                {boardList.map((value, index) => {
                    return (
                        <DropArea destination={index}>
                            <span className="header-text">{value.header}</span>
                            <div className="task-list">
                                {value.children}
                            </div>
                        </DropArea>
                    )
                })}
            </div>
            <Outlet />
        </>

    );
}

export default MainPage;