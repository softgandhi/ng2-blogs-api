/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.json({ title: 'Blog Application' });
    // res.render('index', { title: 'Blog Application' });
});

export default router;