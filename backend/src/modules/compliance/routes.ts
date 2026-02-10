import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Compliance GET' }));
router.post('/', (req, res) => res.json({ message: 'Compliance POST', body: req.body }));

export default router;
