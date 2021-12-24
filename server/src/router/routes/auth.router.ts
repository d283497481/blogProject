import Router from 'koa-router';
import authController from '../../controller/auth.controller';
import { verifyLogin } from '../../middleware/auth.middleware';

const router = new Router();

router.post('/login', verifyLogin, authController.login);

module.exports = router;
