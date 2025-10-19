/** @format */

import About from '@/components/LandingPage/About';
// import Automate from '@/components/LandingPage/Automate';
import Contact from '@/components/LandingPage/Contact';
import Features from '@/components/LandingPage/Features';
import Footer from '@/components/LandingPage/Footer';
import Hero from '@/components/LandingPage/Hero';
import HowItWorks from '@/components/LandingPage/HowItWorks';
import MakeTime from '@/components/LandingPage/MakeTime';
// import Navbar from '@/components/LandingPage/NavBar';
import TrustedBy from '@/components/LandingPage/TrustedBy';

export default function Home() {
	return (
		<div className='gap-10'>
			{/* <Navbar/> */}
			<Hero />
			<TrustedBy />
			<Features />
			<HowItWorks />
			{/* <Automate /> */}
			<MakeTime />
			<About />
			<Contact />
			<Footer />
		</div>
	);
}
