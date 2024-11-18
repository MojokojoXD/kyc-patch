import type { NextMiddleware } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const setPasswordRouteBody = z.object({
	usrEmail: z.string(),
	usrVerifyCode: z.string(),
	usrNewPwd: z.string(),
	usrConfPwd: z.string(),
});

const requestResetCodeRouteBody = z.object({
	email: z.string(),
});

const loginRouteBody = z.object({
	username: z.string(),
	password: z.string(),
});

const middleware: NextMiddleware = async (req) => {
	if (req.nextUrl.pathname.startsWith('/api/change-password')) {
		const body = await req.json();
		const parseResult = setPasswordRouteBody.strict().safeParse(body);

		if (req.method === 'POST' && parseResult.success) {
			return NextResponse.next();
		}

		return NextResponse.json(
			{ Status: 'FAIL', Message: 'request improperly configured' },
			{ status: 400 }
		);
	}

	if (req.nextUrl.pathname.startsWith('/api/request-reset-code')) {
		const body = await req.json();
		const parseResult = requestResetCodeRouteBody.strict().safeParse(body);

		if (req.method === 'POST' && parseResult.success) {
			return NextResponse.next();
		}

		return NextResponse.json({ Status: 'FAIL', Message: '' }, { status: 400 });
	}

	if (req.nextUrl.pathname.startsWith('/api/login')) {
		const body = await req.json();
		const parseResult = loginRouteBody.strict().safeParse(body);

        if ( req.method === 'POST' && parseResult.success ) return NextResponse.next();
        
        return NextResponse.json({ Status: 'FAIL', Message: '' }, { status: 400 })
    }
    
};

export { middleware };
