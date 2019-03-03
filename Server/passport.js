const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const {JWT_SECRET} = require('./config');
const User = require('./models/user');

passport.use(new JWTStrategy({ 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done)=>{
    try{
        const user = await User.findById(payload.sub);
        if (!user){
            return done(null,false);
        }
        done(null,user);
    }catch(error){
        done(error,false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
},async (email, password, done) =>{
    try{
        const user = await User.findOne({ email });
        if (!user){
            return done(null,false);
        }

        const isMatch = await user.passValid(password);
        if(!isMatch) {
            return done(null,false);
        }

        done(null,user);
    }catch(error){
        done(error,false);
    }
}));