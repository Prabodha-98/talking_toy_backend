const router = require('express').Router();
const UserController = require("../controller/user.controller");

router.post('/registration', UserController.register);
router.post('/login', UserController.login);

router.route("/update/:password").patch((req, res) => {
    UserController.findOneAndUpdate(
        { password: req.params.password},
        {$set: { password: req.body.password} },
        (err, result) => {
            if (err) return res.status(500).json ({ msg: err});
            const msg = {
                msg: "password successfully updated",
                password: req.params.password,
            };
            return res.json(msg);
        }
    )
});


router.route("/delete/:password").delete((req, res) =>{
    User.findOneAndUpdate({ password: req.params.password}, (err, result) => {
        if (err) return res.status(500).json({msg: err});
        const msg ={
            msg: "Password deleted",
            password: req.params.password,
        };
        return res.json(msg);
    });
});

router.post('/request-reset', UserController.request_reset);
router.post('/check-code', UserController.check_code);
  
  router.post('/reset',UserController.reset);
  // router.post('/reset', async (req, res) => {
  //   try {
  //     const { token, newPassword } = req.body;
  //     await UserController.resetPassword(token, newPassword);
  //     res.status(200).json({ message: 'Password reset successful.' });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: error.message });
  //   }
  // });
module.exports = router;