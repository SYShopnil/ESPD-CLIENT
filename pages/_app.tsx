import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import '@/styles/header.css'
import '@/styles/HomeBanner.css'
import '@/styles/count.css'
import '@/styles/Subject.css'
import '@/styles/Excellence.css'
import '@/styles/Appreciation.css'
import '@/styles/FAQs.css'
import '@/styles/Discover.css'
import '@/styles/Footer.css'
import '@/styles/home.css'
import '@/styles/signUp.css'
import '@/styles/SignUpForm.css'
import '@/styles/StudentOrTeacher.css'
import '@/styles/LogInFrom.css'
import '@/styles/confirmLesson.css'
import '@/styles/Congratulations.css'
import '@/styles/otpVerification.css'
import '@/styles/teacherOnboarding.css'
import '@/styles/BookingOption.css'
import '@/styles/FindTutorPopUp.css'
import '@/styles/search.css'
import '@/styles/studentProfile.css'
import '@/styles/teacherProfile.css'
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/availability-popup.css'
import '@/styles/work-espd.css'
import '@/styles/resources.css'
import '@/styles/privacyPolicy.css'
import '@/styles/blog-details.css'
import '@/styles/ResponsiveStyle.css'


import React from 'react'
import Script from "next/script";
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import LogInFrom from "@/components/pages/logIn/LogInFrom";
import Congratulations from "@/pages/congratulations";
import FindTutorPopUp from "@/components/pages/home/FindTutorPopUp";
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient())


	return (

		<QueryClientProvider client={queryClient}>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=AW-10928290691"></script>
				<script>
					{`window.dataLayer = window.dataLayer || []
					function gtag(){dataLayer?.push(arguments)}
					gtag('js', new Date());

					gtag('config', 'AW-10928290691');`}
				</script>
				<script>
					{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'AW-10928290691');`}
				</script>

			</Head>
			<Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
			<Script id="google-analytics" strategy="lazyOnload">
				{`
				  window.dataLayer = window.dataLayer || [];
				  function gtag(){dataLayer.push(arguments);}
				  gtag('js', new Date());
		 
				  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
				`}
			</Script>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
				crossOrigin="anonymous"
			/>
			<Script>
				{
					`
					window.addEventListener('load', function() {
						if (window.location.pathname == '/payment-success') {
						  gtag('event', 'conversion', {
							'send_to': 'AW-10928290691/e7oJCLLJk4UZEIP3gdso'
						  });
						}
					  });
					`
				}
			</Script>
			<Component {...pageProps} />
			<ToastContainer />
		</QueryClientProvider>
	);
}
