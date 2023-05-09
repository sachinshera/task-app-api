import { Router } from 'express';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateTaskDto } from '@/dtos/task.dto';
import { Routes } from '@interfaces/routes.interface';
import { TaskController } from '@/controllers/task.controller';
export class TaskRoute implements Routes {
    public path  = '/task';
   public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
      
        var taskController = new TaskController();
        this.router.get(`${this.path}`,AuthMiddleware, taskController.getAllTasks);
        // @ts-ignore
        this.router.post(`${this.path}`,AuthMiddleware, ValidationMiddleware(CreateTaskDto, 'body'), taskController.addTask);
            // @ts-ignore
        this.router.delete(`${this.path}/:id`,AuthMiddleware, taskController.deleteTask);
            // @ts-ignore
        this.router.put(`${this.path}/:id`,AuthMiddleware, ValidationMiddleware(CreateTaskDto, 'body', true), taskController.updateTask);
       
    }
}