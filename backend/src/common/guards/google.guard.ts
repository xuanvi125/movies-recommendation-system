import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    handleRequest(err, user, info, context) {
        const res = context.switchToHttp().getResponse();
        const CLIENT_URL = process.env.CLIENT_REDIRECT_URL;

        if (err || !user) {
            const errorMessage = info?.message || 'Consent cancelled by user';
            return res.redirect(`${CLIENT_URL}/login?error=${errorMessage}`);
        }

        return user;
    }
}
