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

const middleware: NextMiddleware = async req =>
{
  const path = req.nextUrl.pathname;
  const isLoggedIn = req.cookies.has( 'securedRefreshtokenCookie' );

  if (!isLoggedIn && path === '/dashboard') {
    return NextResponse.redirect(new URL('/', req.url));
  } 

  if (path.startsWith('/api/change-password')) {
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

  if (path.startsWith('/api/request-reset-code')) {
    const body = await req.json();
    const parseResult = requestResetCodeRouteBody.strict().safeParse(body);

    if (req.method === 'POST' && parseResult.success) {
      return NextResponse.next();
    }

    return NextResponse.json({ Status: 'FAIL', Message: '' }, { status: 400 });
  }

  if (path.startsWith('/api/login')) {
    const body = await req.json();
    const parseResult = loginRouteBody.strict().safeParse(body);

    if (req.method === 'POST' && parseResult.success) return NextResponse.next();

    return NextResponse.json({ Status: 'FAIL', Message: '' }, { status: 400 });
  }
};

export { middleware };
