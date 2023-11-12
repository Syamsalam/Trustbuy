const { Strategy, ExtractJwt } = require('passport-jwt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const config = {
        secret: "trustBuy",
        expiresIn: 24 * 60 * 60 
}
const applyPassportStrategy = (passport) => {
    const options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = config.secret;

    passport.use(
        new Strategy(options, async (playload, done) => {
            if (playload.username != null) {
                try {
                    const user = await prisma.users.findFirst({
                        where: {
                            OR: [
                                { username: playload.username },
                                { email: playload.username }
                            ]
                        }
                    })
                    if (user) {
                        return done(null, {
                            id: user.id,
                            username: user.username,
                            role: user.role_id
                        })
                    } else {
                        return done(null, false)
                    }
                } catch (err) {
                    return done(err, false)
                }
            }
        })
    )
};

module.exports = {
    applyPassportStrategy,
    config
}