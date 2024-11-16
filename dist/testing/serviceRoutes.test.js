var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from 'supertest';
import express from 'express';
import ServiceRoutes from '../routes/routes.js';
import { connectDB } from '../utils/connection.js';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
app.use('/api', ServiceRoutes);
const request = supertest(app); // Create a request object bound to the app
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB(); // Ensure this is awaited
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connection.close();
}));
describe('Service Routes', () => {
    let serviceId;
    it('should create a new service', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/service')
            .send({
            serviceName: 'Test Service',
            price: 100,
            description: 'This is a test service.',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id'); // Correct property for ID
        expect(response.body.serviceName).toBe('Test Service');
        serviceId = response.body._id; // Store the ID for later tests
    }));
    it('should return all services', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/services');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it('should return a single service', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/service/${serviceId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', serviceId); // Use _id for comparison
    }));
    it('should update a service', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .put(`/api/service/${serviceId}`)
            .send({
            serviceName: 'Updated Service',
            price: 150,
            description: 'This is an updated test service.',
        });
        expect(response.status).toBe(200);
        expect(response.body.serviceName).toBe('Updated Service');
    }));
    it('should delete a service', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete(`/api/service/${serviceId}`);
        expect(response.status).toBe(204);
    }));
});
