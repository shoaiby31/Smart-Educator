import React from "react";

// import LandingNavbar from "../components/LandingNavbar";
import HeroSection from "../components/HeroSection";
import Features from '../components/features'
import Whoisit from '../components/whoisit'
import Testimonials from '../components/testimonials'
import Contact from '../components/contact'
import AnnouncementBar from "../components/AnnouncementBar";
import AboutSmartEducator from '../components/AboutSmartEducator'
import HowSmartEducatorWorks from '../components/HowSmartEducatorWorks'
import CTASection from "../components/CTASection";
const Landing = () => {
    return (
        <>
            <AnnouncementBar />
            <HeroSection />
            <AboutSmartEducator />
            <HowSmartEducatorWorks />
            <Features />
            <Whoisit />
            <Testimonials />
            <Contact />
            {/* <FeaturesSection />
            <StatsSection />
            <WhyChooseUs /> */}
            <CTASection />
        </>
    );
};

export default Landing;