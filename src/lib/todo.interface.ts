import { ObjectId } from "@fastify/mongodb";

export interface Todo {
  id?: ObjectId;
  name: string;
  completed: boolean;
}
