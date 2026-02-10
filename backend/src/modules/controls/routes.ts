import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Controls GET' }));
router.post('/', (req, res) => res.json({ message: 'Controls POST', body: req.body }));

export default router;
