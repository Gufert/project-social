export interface Post {
    pid: String;
    uid: String;
    date: Date;
    content: String;
    likes: Array<any>;
    dislikes: Array<any>;
    replies: Array<any>
 }