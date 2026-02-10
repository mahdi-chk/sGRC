import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Governance GET' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Governance POST', body: req.body });
});

export default router;
