import { useSelector } from "react-redux";
import { Status } from "../types";
import { getTodosByStatus } from "../features/todoSlice";
import DropArea from "./DropArea";
import TodoCard from "./TodoCard";
import { Link } from "react-router-dom";
import { iconPlus } from "../utils/icons";
import { useRef } from "react";
import todoStyle from "../style/todo.module.css";
import mainStyle from "../style/main.module.css";

interface StatusSectionProps {
    status: Status
}

function StatusSection({ status }: StatusSectionProps) {
    const todos = useSelector(getTodosByStatus(status));
    const names = useRef(['Todo', 'In Progress', 'Done']);

    return (
        <section>
            <h2 className={mainStyle.headerText}>
                {names.current[status]}
            </h2>
            <DropArea status={status}>
                {
                    (!todos || todos.length === 0) &&
                    <div className={todoStyle.empty}>Здесь пока что нет тикетов</div>
                }
                {
                    todos.map(todo =>
                        <TodoCard key={todo.id} todo={todo} />
                    )
                }
            </DropArea>
            {
                status === Status.Created && <Link className={todoStyle.button} to='/create'>{iconPlus}Добавить тикет</Link>
            }
        </section>
    );
}

export default StatusSection;