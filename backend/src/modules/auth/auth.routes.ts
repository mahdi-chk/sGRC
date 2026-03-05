import { Router } from 'express';
import { User } from '../users/user.model';
import { Department } from '../departments/department.model';
import { verifyPassword } from '../../utils/security';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me_to_a_secure_value';

// Login route
router.post('/login', async (req, res) => {
    try {
        const { mail, password } = req.body;

        if (!mail || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({
            where: { mail },
            include: [{ model: Department, as: 'departement' }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = verifyPassword(password, user.password_hash, user.password_salt);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.mail,
                role: user.role,
                departementId: user.departementId,
                departementNom: user.departement?.nom
            },
            JWT_SECRET,
            { expiresIn: '10m' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                mail: user.mail,
                role: user.role,
                departementId: user.departementId,
                departementNom: user.departement?.nom
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Refresh token route
router.get('/refresh', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);

        // Remove iat and exp to sign a new token
        const { iat, exp, ...payload } = user;

        const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' });
        res.json({ token: newToken });
    });
});

export { router };
