export interface Post {
    pid: string;
    uid: string;
    date: Date;
    content: string;
    likes: Array<any>;
    dislikes: Array<any>;
    replies: Array<any>
 }