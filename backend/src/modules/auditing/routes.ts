import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Auditing GET' }));
router.post('/', (req, res) => res.json({ message: 'Auditing POST', body: req.body }));

export default router;
