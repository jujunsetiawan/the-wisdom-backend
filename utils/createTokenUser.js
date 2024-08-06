const createTokenUser = (user) => {
    return {
        userId: user.id,
        name: user.name,
        email: user.email,
        profession: user.profession,
        role: user.role
    }
}

module.exports = { createTokenUser }