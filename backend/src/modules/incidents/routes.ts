import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Incidents GET' }));
router.post('/', (req, res) => res.json({ message: 'Incidents POST', body: req.body }));

export default router;
