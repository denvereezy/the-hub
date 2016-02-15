const bcrypt = require('bcrypt');

exports.userCheck = function (req, res, next) {
        if (req.session.user){
             next();
        }
        else{
             res.redirect("/")
        }
    };

    exports.signup = function(req, res, next) {
        req.getServices()
            .then(function(services){
                const input = JSON.parse(JSON.stringify(req.body));
                const data = {
                    username: input.username,
                    password: input.password,
                    user_role: 'read-only'
                };
                const loginDataService = services.loginDataService;
                loginDataService.signup(data)
                    .then(function(results){
                        res.redirect('/?status=user_created');
                    })
            })
                .catch(function(err){
                        next(err);
                });
    };

    exports.userLogin = function(req, res, next) {
     req.getServices()
         .then(function(services){
             const input = JSON.parse(JSON.stringify(req.body));
             const username = input.username;
             const loginDataService = services.loginDataService;
             loginDataService.login(username)
                 .then(function(results){
                     const user = results[0];
                     bcrypt.compare(input.password, user.Password,function(err, pass) {
                         if (pass) {
                             req.session.user = username;
                             req.session.role =  user.User_role;
                             return res.redirect("/home")
                         } else {
                             return res.redirect('/');

                         }
                     });
                 })
         })
         .catch(function(err){
             next(err);
         });
 };
