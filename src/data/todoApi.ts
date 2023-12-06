import { Todo } from '../types';
import { getItem, setItem } from './LSRequest';

const TODOS = 'todos';

export async function getTodos() {
    const todos = await getItem(TODOS);
    if (!todos) {
        setItem(TODOS, JSON.stringify([]));
        return [];
    }
    return JSON.parse(todos);
}

export async function setTodos(todos) {
    if (!todos) {
        setItem(TODOS, JSON.stringify([]));
    }
    return JSON.parse(todos);
}

export async function addTodo(todo: Todo) {
    const todos = await getTodos();
    await setItem(TODOS, JSON.stringify([...todos, todo]));
    return todo;
}

export async function updateTodo(todo: Todo) {
    const todos = await getTodos();
    const index = todos.findIndex(item => item.id === todo.id);
    todos[index] = todo;
    await setItem(TODOS, JSON.stringify(todos));
    return todo;
}

export async function deleteTodo(todo) {
    const todos = await getTodos();
    return setItem(TODOS, JSON.stringify(
        todos.filter((value, index, array) => {
            return value.id !== todo.id;
        }))
    );
}

export default { getTodos, addTodo, updateTodo, deleteTodo };