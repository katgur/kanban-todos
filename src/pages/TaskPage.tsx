import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Input from "../components/Input"
import Modal from "../components/Modal"

function TaskPage() {
  const params = useParams();
  const tasks = useSelector(state => state.todo.data);
  const task = tasks.find(task => task.id === params.id);

  const children = [
      <span className="header-text">{task ? "Редактировать тикет" : "Создать тикет"}</span>,
      <div className="task-list">
        <Input task={task} />
      </div>
  ];
  
  return (
    <Modal children={children} />
  )
}

export default TaskPage;