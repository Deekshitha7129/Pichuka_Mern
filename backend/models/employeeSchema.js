import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Employee' },
    restaurant: { type: String, default: 'Pichuka Restaurant' },
    createdAt: { type: Date, default: Date.now }
});

export const Employee = mongoose.model('Employee', employeeSchema);
