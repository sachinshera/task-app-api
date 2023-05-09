import { TaskModel } from "@/models/task.model";
import { nanoid } from "nanoid";
import { Service } from 'typedi';

@Service()
export class TaskService {
    // add new task

  static  async addTask(taskData: TaskModel): Promise<any> {
        const createTaskData: TaskModel = await TaskModel.create({ id: nanoid(20), ...taskData });
        return createTaskData;
    }

    // delete task

    static async deleteTask(taskId: string,userId:string): Promise<any> {
        // check task is not locked
        const checkTask = await TaskModel.findOne({ where: { id: taskId , user_id:userId} });
        if(!checkTask) throw new Error("Task not found");
        if (checkTask.lock) throw new Error("Task is locked");
        const deleteTask: number = await TaskModel.destroy({ where: { id: taskId, user_id:userId } });
        return deleteTask;
    }

    // update task by id

    static async updateTask(taskId: string, taskData: TaskModel,userId:string): Promise<any> {
        // check task is not locked
        const checkTask = await TaskModel.findOne({ where: { id: taskId,user_id:userId } });
        if(!checkTask) throw new Error("Task not found");
        if (checkTask.lock) throw new Error("Task is locked");
        const updateTask = await TaskModel.update({ ...taskData }, { where: { id: taskId,user_id:userId } });
        // send updated data

        return await TaskModel.findOne({where:{id:taskId}});
    }

    // get all tasks of a user

    static async getAllTasks(userId: string): Promise<any> {
        const allTasks = await TaskModel.findAll({ where: { user_id: userId } });
        return allTasks;
    }
}