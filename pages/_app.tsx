import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import UserContextProvider from '@/Contexts/UserProfileProvider';
import localFont from 'next/font/local'

const circular = localFont( {
    preload: false,
    src: [
      {
            path: '../public/fonts/Circular_Pro_Black.ttf',
        weight: '900',
            style: 'normal',
      },
      {
        path: '../public/fonts/Circular_Pro_Bold.ttf',
        weight: '700',
        style: 'normal',
        },
        {
            path: '../public/fonts/Circular_Pro_Book.ttf',
            weight: '400',
            style: 'normal'
      },
      {
        path: '../public/fonts/Circular_Pro_Medium.ttf',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../public/fonts/Circular_Pro_Light.otf',
        weight: '100',
          style: 'normal',
        
      },
    ],
  })

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
		<main className={ circular.className }>
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
		</main>
	);
}
