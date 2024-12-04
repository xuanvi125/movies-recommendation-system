import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService        
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
            scope: ['email', 'profile']
        });
    }

    async validate(request: any, accessToken: string,
                   refreshToken: string, profile: any, done: VerifyCallback) {
        const user = {
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id,
        };
        const response = this.authService.validateGoogleUser(user);
        
        return response;
    }
}