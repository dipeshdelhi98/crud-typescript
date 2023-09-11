import { Router } from 'express';
import { downloadBlogsAsCSV } from '../controllers/DownloadController';


const router = Router();
router.get('/csv', downloadBlogsAsCSV);

export default router;
