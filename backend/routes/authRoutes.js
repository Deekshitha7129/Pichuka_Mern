import express from 'express';
import { Employee } from '../models/employeeSchema.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    Employee.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ message: 'Success', user: user });
                } else {
                    res.status(400).json('The password is incorrect');
                }
            } else {
                res.status(404).json('No record Existed');
            }
        })
        .catch(err => res.status(500).json(err));
});

router.post('/register', (req, res) => {
    Employee.create(req.body)
        .then(employee => res.status(201).json(employee))
        .catch(err => res.status(500).json(err));
});

export default router;
