import { ErrorSend } from "../../utils/errorHandle.js";
import { Service } from "../models/service.js";

class RepositoryService {
    async addService(serviceName: string, price: number, description: string, next: Function) {
        try {
            const service = {
                serviceName,
                price,
                description
            };
            const result = new Service(service);
            await result.save();
            return result;
        } catch (err) {
            next(new ErrorSend("Failed to add service", 400, false, true));
        }
    }

    async getService(_id: string) {
        try {
            const result = await Service.findById(_id);
            if (!result) {
                throw new ErrorSend("Service not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error fetching service", 500, false, true);
        }
    }

    async getAllService() {
        try {
            const result = await Service.find({});
            if (!result) {
                throw new ErrorSend("Service not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error fetching service", 500, false, true);
        }
    }

    async updateService(_id: string, serviceName?: string, price?: number, description?: string) {
        try {
            const updatedService: { serviceName?: string; price?: number; description?: string } = {};
            if (serviceName) updatedService.serviceName = serviceName;
            if (price) updatedService.price = price;
            if (description) updatedService.description = description;

            const result = await Service.findByIdAndUpdate(_id, updatedService, { new: true });
            if (!result) {
                throw new ErrorSend("Service not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error updating service", 500, false, true);
        }
    }

    async deleteService(_id: string) {
        try {
            const result = await Service.findByIdAndDelete(_id);
            if (!result) {
                throw new ErrorSend("Service not found", 404, false, true);
            }
            return result;
        } catch (err) {
            throw new ErrorSend("Error deleting service", 500, false, true);
        }
    }
}

export default RepositoryService;