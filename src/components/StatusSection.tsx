import { useSelector } from "react-redux";
import { Status } from "../types";
import { getTodosByStatus } from "../features/todoSlice";
import DropArea from "./DropArea";
import TodoCard from "./TodoCard";
import { Link } from "react-router-dom";
import { iconPlus } from "../utils/icons";

interface StatusSectionProps {
    status: Status
}

const names = ['Todo', 'In Progress', 'Done'];

function StatusSection({ status }: StatusSectionProps) {
    const todos = useSelector(getTodosByStatus(status));

    return (
        <section>
            <h2>
                {names[status]}
            </h2>
            <DropArea status={status}>
                {
                    (!todos || todos.length === 0) &&
                    <div className="empty">No todos yet</div>
                }
                {
                    todos.map(todo =>
                        <TodoCard key={todo.id} todo={todo} />
                    )
                }
            </DropArea>
            {
                status === Status.Created && <Link className="button clearfix" to='/create'>{iconPlus}Добавить тикет</Link>
            }
        </section>
    );
}

export default StatusSection;