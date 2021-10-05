import passport from 'passport';
import passportLocal from 'passport-local';
import Usuario from '../models/usuario'

const LocalStrategy = passportLocal.Strategy;

const StrategyOptions = {
    usernameField     : 'username',
    passwordFIeld     : 'password',
    passReqToCallback : true
}
  
  const loginFunc = async (req, username, password, done) => {
    
  
    const user = await Usuario.findOne({ username });
    
  
    if (!user) {
      return done(null, false, { message: 'User does not exist' });
    }
   
    if (!await user.isValidPassword(password)) {
      return done(null, false, { message: 'Password is not valid.' });
    }
    console.log('SALIO TODO BIEN');
    return done(null, user);
  };

  const signUpFunc = async (req, username, password, done) => {
    try {
      if (!username || !password) {
        console.log('Invalid body fields');
        return done(null, false);
      }

      const user = await Usuario.findOne({username});

       
      if (user) {
        console.log('User already exists');
        return done(null, false, 'User already exists');
      } else {
        const userData = {
          username,
          password

        };
  
        const newUser = new Usuario(userData);
  
        await newUser.save();

        return done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  };

  passport.use('login', new LocalStrategy(StrategyOptions, loginFunc));
  passport.use('signup', new LocalStrategy(StrategyOptions, signUpFunc));


passport.serializeUser((user, done) => {
    
    done(null, user._id);
  });
  
  passport.deserializeUser((userId, done) => {
    Usuario.findById(userId, function (err, user) {
      done(err, user);
    });
  });

  export default passport