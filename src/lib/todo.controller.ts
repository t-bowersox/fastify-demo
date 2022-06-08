import {
  Collection,
  Db,
  DeleteResult,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
} from "mongodb";
import { Todo } from "./todo.interface";

export class TodoController {
  private todos: Collection<Todo>;

  constructor(private db: Db) {
    this.todos = this.db.collection<Todo>("todos");
  }

  public createTodo(name: string): Promise<InsertOneResult> {
    const newTodo: Todo = { name, completed: false };
    return this.todos.insertOne(newTodo);
  }

  public updateTodo(id: ObjectId, name: string): Promise<UpdateResult> {
    const updateDoc = {
      $set: { name },
    };
    return this.todos.updateOne({ _id: id }, updateDoc);
  }

  public getAllTodos(): Promise<WithId<Todo>[]> {
    return this.todos.find({}).toArray();
  }

  public getTodoById(id: ObjectId): Promise<WithId<Todo> | null> {
    return this.todos.findOne({ _id: id });
  }

  public deleteTodo(id: ObjectId): Promise<DeleteResult> {
    return this.todos.deleteOne({ _id: id });
  }

  public completeTodo(id: ObjectId): Promise<UpdateResult> {
    return this.todos.updateOne({ _id: id }, { $set: { completed: true } });
  }
}
