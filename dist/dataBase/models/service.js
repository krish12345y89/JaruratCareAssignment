import { Schema, model } from "mongoose";
const schema = new Schema({
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
export const Service = model("Service", schema);
