import { TaskService } from '@/services/task.service';
import { NextFunction, Request, Response } from 'express';

export class TaskController {  
    public addTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const taskData = req.body;
        // @ts-ignore
        let user = req.user;
        taskData.user_id = user.id;
        const createTaskData = await TaskService.addTask(taskData);
        res.status(201).json(createTaskData);
        } catch (error) {
        next(error);
        }
    };
    
    public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const taskId = String(req.params.id);
        // @ts-ignore
        let userId  = req.user.id;
        const deleteTaskData = await TaskService.deleteTask(taskId,userId);
        res.status(200).json({message: 'deleted' });
        } catch (error) {
        next(error);
        }
    };
    
    public updateTask = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const taskId = String(req.params.id);
        const taskData = req.body;
        // @ts-ignore
        let userId = req.user.id;
        const updateTaskData = await TaskService.updateTask(taskId, taskData,userId);
        res.status(200).json(updateTaskData);
        } catch (error) {
        next(error);
        }
    };
    
    public getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
        // @ts-ignore
        const userId = req.user.id;
        const allTasks = await TaskService.getAllTasks(userId);
        res.status(200).json(allTasks);
        } catch (error) {
        next(error);
        }
    };
}