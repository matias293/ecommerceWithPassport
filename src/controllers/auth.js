import bcrypt from'bcryptjs'

import Usuario from '../models/usuario'


class Auth {

    getLogin = (req,res) => {
       
        if(req.session.loggedIn){
            res.redirect('/')
        }
       res.render('login',{pageTitle:'Login'})

     }

     postLogin = async(req,res) => {
     if(req.session.loggedIn){
      return res.redirect('/')
     }
     req.session.loggedIn = true
      await req.session.save()
      return res.redirect('/')

     }

     getLogOut  = (req,res) => {
       
          if(!req.session.loggedIn){
             return res.redirect('/login')
          }

        const username = req.user.username
         
         req.session.destroy();
         
          res.render('home',{pageTitle:'Home',isLogIn:false,username})

         
     }

     getSignUp = (req,res) => {
        res.render('signup',{pageTitle:'Sign Up'})
     }

     postSignUp = async(req,res) => {
      req.session.loggedIn = true
      await req.session.save()
          res.redirect('/')     
     }

}

export const authController = new Auth()