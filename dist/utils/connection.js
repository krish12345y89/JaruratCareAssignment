var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { ErrorSend } from "./errorHandle.js";
import { config } from "dotenv";
config({});
const URI = process.env.MONGO_URI;
export const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(URI)
        .then(() => {
        console.log("Application connected to the database");
    })
        .catch((err) => {
        throw new ErrorSend("Failed to connect with database", 500, false, true);
    });
});
