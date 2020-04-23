'use strict'

class AuthController {
    async login({ auth, request, response }) {
        const { email, password } = request.all();
        const token = await auth
            .withRefreshToken()
            .attempt(email, password);

        return token;
    }

    async me({ auth, response }) {
        try {
            return await auth.getUser();
        } catch (error) {
            response.send('Missing or invalid jwt token');
        }
    }

    async getNewToken({auth, request}) {
        const refreshToken = request.input('refresh_token');
        const newToken = await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken);

        return newToken;
    }
}

module.exports = AuthController
