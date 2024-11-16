import supertest from 'supertest';
import express from 'express';
import ServiceRoutes from '../routes/routes.js'; 
import { connectDB } from '../utils/connection.js'; 
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/api', ServiceRoutes);

const request = supertest(app); // Create a request object bound to the app

beforeAll(async () => {
    await connectDB(); // Ensure this is awaited
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Service Routes', () => {
    let serviceId:string;

    it('should create a new service', async () => {
        const response = await request
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
    });

    it('should return all services', async () => {
        const response = await request.get('/api/services');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a single service', async () => {
        const response = await request.get(`/api/service/${serviceId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', serviceId); // Use _id for comparison
    });

    it('should update a service', async () => {
        const response = await request
            .put(`/api/service/${serviceId}`)
            .send({
                serviceName: 'Updated Service',
                price: 150,
                description: 'This is an updated test service.',
            });

        expect(response.status).toBe(200);
        expect(response.body.serviceName).toBe('Updated Service');
    });

    it('should delete a service', async () => {
        const response = await request.delete(`/api/service/${serviceId}`);

        expect(response.status).toBe(204);
    });
});