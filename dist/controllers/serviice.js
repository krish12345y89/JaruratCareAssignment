var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RepositoryService from '../dataBase/repository/service.js';
import { ErrorSend } from '../utils/errorHandle.js';
class Controller {
    constructor() {
        this.repository = new RepositoryService();
    }
    services(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.getAllService();
                if (!result) {
                    throw new ErrorSend("Failed to get all services", 404, false, true);
                }
                res.status(200).json(result);
            }
            catch (err) {
                next(new ErrorSend(err.message, err.status, false, true));
            }
        });
    }
    addService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceName, price, description } = req.body;
            try {
                const result = yield this.repository.addService(serviceName, price, description, next);
                res.status(201).json(result);
            }
            catch (err) {
                next(new ErrorSend(err.message, err.status, false, true));
            }
        });
    }
    getService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.getService(req.params.id);
                res.status(200).json(result);
            }
            catch (err) {
                next(new ErrorSend(err.message, err.status, false, true));
            }
        });
    }
    updateService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceName, price, description } = req.body;
            try {
                const result = yield this.repository.updateService(req.params.id, serviceName, price, description);
                res.status(200).json(result);
            }
            catch (err) {
                next(new ErrorSend(err.message, err.status, false, true));
            }
        });
    }
    deleteService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.repository.deleteService(req.params.id);
                res.status(204).send(); // No content
            }
            catch (err) {
                next(new ErrorSend(err.message, err.status, false, true));
            }
        });
    }
}
export default Controller;
