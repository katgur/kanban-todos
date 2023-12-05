import { v4 as uuidv4 } from 'uuid';

export function create(name, text, tags) {
    return {
        id: uuidv4(),
        name: name, 
        text: text,
        tags: tags,
        status: 0,
        comments: []
    };
}

export function edit(todo, name, text, tags) {
    return {
        id: todo.id,
        name: name, 
        text: text,
        tags: tags,
        status: todo.status
    }
}