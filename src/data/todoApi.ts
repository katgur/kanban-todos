import { Filter, Todo } from '../types';
import { getItem, setItem } from './LSRequest';

const TODOS = 'todos';

export async function getTodos(filters: []) {
    const todos = await getItem(TODOS);
    if (!todos) {
        setItem(TODOS, JSON.stringify([]));
        return [];
    }
    if (filters.length === 0) {
        return JSON.parse(todos);
    }
    const applyFilters = (todo: Todo) => {
        for (const filter of filters) {
            if (todo[filter].length === 0) {
                return false;
            }
        }
        return true;
    }
    return JSON.parse(todos).filter(todo => applyFilters(todo));
}

export async function addTodo(todo: Todo) {
    console.log(todo);
    const todos = await getTodos([]);
    await setItem(TODOS, JSON.stringify([...todos, todo]));
    return todo;
}

export async function updateTodo(todo: Todo) {
    const todos = await getTodos([]);
    const index = todos.findIndex(item => item.id === todo.id);
    todos[index] = todo;
    await setItem(TODOS, JSON.stringify(todos));
    return todo;
}

export async function deleteTodo(todo) {
    const todos = await getTodos([]);
    return setItem(TODOS, JSON.stringify(
        todos.filter((value, index, array) => {
            return value.id !== todo.id;
        }))
    );
}

export default { getTodos, addTodo, updateTodo, deleteTodo };