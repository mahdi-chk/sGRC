import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Actions GET' }));
router.post('/', (req, res) => res.json({ message: 'Actions POST', body: req.body }));

export default router;
