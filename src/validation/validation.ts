import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';


export const validateCreateService = [
    body('serviceName')
        .notEmpty().withMessage('Service name is required')
        .isLength({ min: 3 }).withMessage('Service name must be at least 3 characters long'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];

export const validateUpdateService = [
    param('id')
        .isMongoId().withMessage('Invalid service ID'),
    body('serviceName')
        .optional()
        .isLength({ min: 3 }).withMessage('Service name must be at least 3 characters long'),
    body('price')
        .optional()
        .isNumeric().withMessage('Price must be a number'),
    body('description')
        .optional()
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
};