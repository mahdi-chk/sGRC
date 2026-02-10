import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Risk GET' }));
router.post('/', (req, res) => res.json({ message: 'Risk POST', body: req.body }));

export default router;
