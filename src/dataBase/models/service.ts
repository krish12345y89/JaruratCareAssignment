import { Schema, Document, model } from "mongoose";

interface IService extends Document {
    serviceName: string;
    price: number;
    description: string;
}

const schema = new Schema<IService>({
    serviceName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const Service = model<IService>("Service", schema);