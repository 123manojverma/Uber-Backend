import * as authService from "../services/authService.js";

export const register = async (req, res) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).send({
            data: { user, token },
            success: true,
            error: null,
            message: "Successfully registered user"
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });
        res.cookie('token', `bearer ${token}`, {
            maxAge: 900000, // 15 minutes in milliseconds
            httpOnly: true, // Prevents access via JavaScript (XSS protection)
            secure: process.env.NODE_ENV === "production"
        });
        res.status(200).send({
            data: { user, token },
            success: true,
            error: null,
            message: "Successfully logged in user",
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}