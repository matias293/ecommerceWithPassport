import passport from 'passport';
import passportLocal from 'passport-local';
import Usuario from '../models/usuario'

const LocalStrategy = passportLocal.Strategy;

const StrategyOptions = {
    usernameField     : "username",
    passwordFIeld     : "password",
    passReqToCallback : true
}
  
  const loginFunc = async (req, username, password, done) => {
    const user = await Usuario.findOne({ username });
  
    if (!user) {
      return done(null, false, { message: 'User does not exist' });
    }
    if (!user.isValidPassword(password)) {
      return done(null, false, { message: 'Password is not valid.' });
    }
    console.log('SALIO TODO BIEN');
    return done(null, user);
  };

passport.use('login', new LocalStrategy(StrategyOptions,loginFunc))


passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
  });
  
  passport.deserializeUser((userId, done) => {
    UserModel.findById(userId, function (err, user) {
      done(err, user);
    });
  });