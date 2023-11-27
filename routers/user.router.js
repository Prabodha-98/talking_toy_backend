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
module.exports = router;