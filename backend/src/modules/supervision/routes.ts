import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Supervision GET' }));
router.post('/', (req, res) => res.json({ message: 'Supervision POST', body: req.body }));

export default router;
