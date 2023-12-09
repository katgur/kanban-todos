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

export enum Filter {
    Description = 'description',
    Tags = 'tags',
    Comments = 'comments',
}

export interface Todo {
    id: string,
    name: string,
    description: string,
    tags: string[],
    status: Status,
    comments: Comment[],
}

export interface Point {
    x: number,
    y: number,
}