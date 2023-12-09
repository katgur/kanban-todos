import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import TodoForm from "../components/TodoForm"
import Modal from "../components/Modal"
import { getTodoById } from "../features/todoSlice";
import { closeIcon } from "../utils/icons";
import todoStyle from "../style/todo.module.css";

function TaskPage() {
  const params = useParams();
  const navigate = useNavigate();
  const todo = useSelector(getTodoById(params.id));
  if (todo === undefined) {
    return <>Not Found</>;
  }

  return (
    <Modal isVisible={true}>
      <div className={todoStyle.modal}>
        <div className={todoStyle.formCard}>
          <h1 className={todoStyle.headerText}>
            {todo ? "Редактировать тикет" : "Создать тикет"}
            <span className="right" onClick={() => navigate(-1)}>{closeIcon}</span>
          </h1>
          <div className="task-list">
            <TodoForm todo={todo} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TaskPage;