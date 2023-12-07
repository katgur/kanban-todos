import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import TodoForm from "../components/TodoForm"
import Modal from "../components/Modal"
import { getTodoById } from "../features/todoSlice";
import { closeIcon } from "../utils/icons";

function TaskPage() {
  const params = useParams();
  const navigate = useNavigate();

  const todo = params.id ? useSelector(getTodoById(params.id)) : null;
  if (todo === undefined) {
    return;
  }

  return (
    <Modal isVisible={true}>
      <div className="modal">
        <div className="card">
          <h1 className="header-text">
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