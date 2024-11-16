import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../controllers/serviice.js';
import { handleValidationErrors, validateCreateService, validateUpdateService } from '../validation/validation.js';

const app = Router();
const controller = new Controller();

app.post('/service', validateCreateService, handleValidationErrors, (req: Request, res: Response, next: NextFunction) => {
    controller.addService(req, res, next); 
});

app.put('/service/:id', validateUpdateService, handleValidationErrors, (req: Request, res: Response, next: NextFunction) => {
    controller.updateService(req, res, next);
});

app.get('/services', (req: Request, res: Response, next: NextFunction) => {
    controller.services(req, res, next);
});

app.route('/service/:id')
    .get((req: Request, res: Response, next: NextFunction) => controller.getService(req, res, next))
    .delete((req: Request, res: Response, next: NextFunction) => controller.deleteService(req, res, next));

export default app;