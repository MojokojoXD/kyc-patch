import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import UserContextProvider from '@/Contexts/UserProfileProvider';

export default function App( { Component, pageProps }: AppProps ) 
{
    if ( typeof ( document ) !== "undefined" )
    {
        const favicoTag = document.querySelector( '#favico' );

        if ( !favicoTag ) return;
        const isDark = window.matchMedia( '(prefers-color-scheme:dark)' );

        //@ts-expect-error We return to this later
        favicoTag.href = isDark.matches ? '/favicon-light.png' : '/favicon-dark.png'
    }

	return (
		<>
			<Head>
				<title>SecondSTAX KYC</title>
				<link
					rel='shortcut icon'
					href='/favicon-light.png'
					type='image/x-icon'
					id='favico'
				/>
			</Head>
            <UserContextProvider>
                    <Component {...pageProps} />
			</UserContextProvider>
		</>
	);
}
