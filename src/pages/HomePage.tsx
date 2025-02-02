import React from 'react';
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import Footer from "../components/Footer/Footer";
import ContentSwitcher from '../components/ContentSwitcher/ContentSwitcher';
import AnimatedBarOne from '../components/AnimatedBars/AnimatedBarOne/AnimatedBarOne';
import AnimatedBarTwo from '../components/AnimatedBars/AnimatedBarTwo/AnimatedBarTwo';
import AnimatedBarThree from '../components/AnimatedBars/AnimatedBarThree/AnimatedBarThree';
import "./HomePage.css";
export default function HomePage() {
    const sections = [
        {
          id: "section1",
          content: (
          <AnimatedBarOne/>
          ),
        },
        {
          id: "section2",
          content: (
          <AnimatedBarTwo/>
          ),
        },
        {
          id: "section3",
          content: (
         <AnimatedBarThree/>
          ),
        },
      ];
    return (
        <div className='mainWrapper'>
            <Header />
             <Hero />
             <ContentSwitcher sections={sections} />
         
             <div className="sections-container">     
      <Section
        id="section1"
        title="Innovation in financial technology"
        description="Explore the latest trends in fintech, digital banking and blockchain that are changing the future of finance."
        buttonText="Learn More"
      />
      <Section
        id="section2"
        title="Individual financial solutions"
        description="We create financial instruments tailored to your needs - from lending to investment strategies."
        buttonText="Explore"
      />
      <Section
        id="section3"
        title="The future of finance is in your hands"
        description="Be part of the digital revolution - invest, manage finances and create wealth."
        buttonText="Join Now"
      />
      </div>
     
            <Footer />  
        </div>
    );
}
