import { Router } from 'express';
import Controller from '../controllers/serviice.js';
import { handleValidationErrors, validateCreateService, validateUpdateService } from '../validation/validation.js';
const app = Router();
const controller = new Controller();
app.post('/service', validateCreateService, handleValidationErrors, (req, res, next) => {
    controller.addService(req, res, next);
});
app.put('/service/:id', validateUpdateService, handleValidationErrors, (req, res, next) => {
    controller.updateService(req, res, next);
});
app.get('/services', (req, res, next) => {
    controller.services(req, res, next);
});
app.route('/service/:id')
    .get((req, res, next) => controller.getService(req, res, next))
    .delete((req, res, next) => controller.deleteService(req, res, next));
export default app;
