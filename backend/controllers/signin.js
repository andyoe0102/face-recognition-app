const jwt = require('jsonwebtoken');

const handleSignin = (db,bcrypt,req,res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect from submission');
    }

    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject('unable to get user'))
            } else {
                Promise.reject('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

const getAuthTokenId = () =>{
    console.log("auth ok");
}

const signToken = (email) =>{
    const jwtPayload = {email};
    return jwt.sign({jwtPayload}, 'JWT_SECERT', {expiresIn: '1 days'});
}


const createSessions = (user) =>{
    const {email,id} = user;
    const token = signToken(email);
    return {success: 'true', userId: id, token}

}


const signinAuthentication = (db,bcrypt) => (req,res) =>{
    const { authorization } = req.headers;
    return authorization? getAuthTokenId(): 
        handleSignin(db,bcrypt,req,res)
            .then(data => {
                return data.id && data.email ? createSessions(data): Promise.reject(data)
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
}

module.exports ={
    handleSignin: handleSignin,
    signinAuthentication:signinAuthentication
}