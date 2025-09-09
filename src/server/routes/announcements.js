const express = require('express');
const router = express.Router();

// In-memory store for demo (replace with DB in production)
let announcements = [
  { id: 1, text: "👋 Welcome to the ServiceNow COEI Leaders Community! We’re excited to bring together visionary leaders driving ServiceNow excellence and innovation across industries." },
  { id: 2, text: "📅 Mark your calendars! Join us at Knowledge 2025, where COEI leaders will converge to showcase impact, explore new capabilities, and shape the future of work." },
  { id: 3, text: "✅Have you signed up? Join us at Knowledge 2025 and check back for KPMG's exclusive insights into the newest features, modules & roadmap we discover at the event." }
];

// GET /api/announcements (public)
router.get('/', (req, res) => {
  res.json(announcements);
});

// POST /api/announcements (admin only)
router.post('/', (req, res) => {
  // Add admin authentication/authorization here
  const { header, subcontent } = req.body;
  if (!header || !header.trim()) return res.status(400).json({ error: 'Header is required' });
  // Compose text from header and subcontent
  const text = header + (subcontent ? ('\n' + subcontent) : '');
  const newAnnouncement = { id: Date.now(), text };
  announcements.push(newAnnouncement);
  res.status(201).json(newAnnouncement);
});

// DELETE /api/announcements/:id (admin only)
router.delete('/:id', (req, res) => {
  // Add admin authentication/authorization here
  const id = Number(req.params.id);
  announcements = announcements.filter(a => a.id !== id);
  res.status(204).end();
});

module.exports = router;
