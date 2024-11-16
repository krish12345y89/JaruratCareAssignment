import { Request, Response, NextFunction } from 'express';
import RepositoryService from '../dataBase/repository/service.js';
import { ErrorSend } from '../utils/errorHandle.js';

class Controller {
    repository = new RepositoryService();

    async services(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.repository.getAllService();
            if (!result) {
                throw new ErrorSend("Failed to get all services", 404, false, true);
            }
            res.status(200).json(result);
        } catch (err:any) {
            next(new ErrorSend(err.message,err.status,false,true));
        }
    }

    async addService(req: Request, res: Response, next: NextFunction) {
        const { serviceName, price, description } = req.body;
        try {
            const result = await this.repository.addService(serviceName, price, description, next);
            res.status(201).json(result);
        } catch (err:any) {
            next(new ErrorSend(err.message,err.status,false,true));
        }
    }

    async getService(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.repository.getService(req.params.id);
            res.status(200).json(result);
        } catch (err:any) {
            next(new ErrorSend(err.message,err.status,false,true));
        }
    }

    async updateService(req: Request, res: Response, next: NextFunction) {
        const { serviceName, price, description } = req.body;
        try {
            const result = await this.repository.updateService(req.params.id, serviceName, price, description);
            res.status(200).json(result);
        } catch (err:any) {
            next(new ErrorSend(err.message,err.status,false,true));
        }
    }

    async deleteService(req: Request, res: Response, next: NextFunction) {
        try {
            await this.repository.deleteService(req.params.id);
            res.status(204).send(); // No content
        } catch (err:any) {
            next(new ErrorSend(err.message,err.status,false,true));
        }
    }
}

export default Controller;