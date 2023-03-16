import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Post } from '../services/post'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public dbPath = '/posts';
  postsRef: AngularFireList<Post>;

  constructor(
    public db: AngularFireDatabase){ 
    this.postsRef = db.list(this.dbPath);
  }
  
  getAll(): AngularFireList<Post> {
    return this.postsRef;
  }
  create(post: Post): any {
    return this.postsRef.push(post);
  }
  update(pid: string, value: any): Promise<void> {
    return this.postsRef.update(pid, value);
  }
  delete(pid: string): Promise<void> {
    return this.postsRef.remove(pid);
  }
  deleteAll(): Promise<void> {
    return this.postsRef.remove();
  }
}
