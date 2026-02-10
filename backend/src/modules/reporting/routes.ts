import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Reporting GET' }));
router.post('/', (req, res) => res.json({ message: 'Reporting POST', body: req.body }));

export default router;
