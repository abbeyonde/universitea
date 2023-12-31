const auth = require('../controllers/auth');

module.exports = app => {
    const accounts = require('../controllers/account.controller');
    var router = require('express').Router();

    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/sign-up', accounts.create);
    router.post('/sign-in', accounts.login);
    router.get('/profile/:id',[auth.authenticateToken], accounts.getProfile);
    router.get('/profile/update/:id', [auth.authenticateToken], accounts.update);
    router.put('/profile/:id/change-username',[auth.authenticateToken], accounts.changeUsername);
    router.put('/profile/:id/password',[auth.authenticateToken], accounts.changePassword);
    router.put('/verify/:username/:verifyToken', accounts.verify);
    router.get('/resend-verify/:username', accounts.resendVerify);
    router.get('/forgot-password/:username', accounts.forgotPassword);
    router.put('/reset-password/:username/:token', accounts.resetPassword);

    app.use('/account', router);
}