var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ErrorSend } from "../../utils/errorHandle.js";
import { Service } from "../models/service.js";
class RepositoryService {
    addService(serviceName, price, description, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = {
                    serviceName,
                    price,
                    description
                };
                const result = new Service(service);
                yield result.save();
                return result;
            }
            catch (err) {
                next(new ErrorSend("Failed to add service", 400, false, true));
            }
        });
    }
    getService(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Service.findById(_id);
                if (!result) {
                    throw new ErrorSend("Service not found", 404, false, true);
                }
                return result;
            }
            catch (err) {
                throw new ErrorSend("Error fetching service", 500, false, true);
            }
        });
    }
    getAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Service.find({});
                if (!result) {
                    throw new ErrorSend("Service not found", 404, false, true);
                }
                return result;
            }
            catch (err) {
                throw new ErrorSend("Error fetching service", 500, false, true);
            }
        });
    }
    updateService(_id, serviceName, price, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedService = {};
                if (serviceName)
                    updatedService.serviceName = serviceName;
                if (price)
                    updatedService.price = price;
                if (description)
                    updatedService.description = description;
                const result = yield Service.findByIdAndUpdate(_id, updatedService, { new: true });
                if (!result) {
                    throw new ErrorSend("Service not found", 404, false, true);
                }
                return result;
            }
            catch (err) {
                throw new ErrorSend("Error updating service", 500, false, true);
            }
        });
    }
    deleteService(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Service.findByIdAndDelete(_id);
                if (!result) {
                    throw new ErrorSend("Service not found", 404, false, true);
                }
                return result;
            }
            catch (err) {
                throw new ErrorSend("Error deleting service", 500, false, true);
            }
        });
    }
}
export default RepositoryService;
