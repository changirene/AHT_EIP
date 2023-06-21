import express, { Request, Response } from 'express';
const router: any = express.Router();
import passport from "passport";

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
}));

// router.get('/google/callback', passport.authenticate('google', { session: false }), (req: Request, res: Response) => {
//     // res.send({
//     //   status: true,
//     //   data: {
//     //     id: '456456',
//     //     name: 'test'
//     //   }
//     // });
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/login_success',
//         failureRedirect: '/auth/login_failure'
//       })
// })

router.get( '/google/callback',
  passport.authenticate( 'google', {
    session: false,
    successRedirect: '/auth/login_success',
    failureRedirect: '/auth/login_failure'
  })
);

router.get("/login_success", (req: Request, res: Response) =>{
    res.send("succ");
})

router.get("/login_failure", (req: Request, res: Response) =>{
    res.send("failure");
})


  export{router as authRouter};