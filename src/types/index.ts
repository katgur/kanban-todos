export interface Comment {
    id: string,
    date: string,
    content: string,
}

export enum Status {
    Created,
    Progress,
    Done,
}

export type Tag = 'violet' | 'green' | 'red' | 'orange' | 'light-blue' | 'lime' | 'blue' | 'yellow';

export type Filter = 'tags' | 'description' | 'comments';

export interface Todo {
    id: string,
    name: string,
    description: string,
    tags: Tag[],
    status: Status,
    comments: Comment[],
}

export interface Point {
    x: number,
    y: number,
}