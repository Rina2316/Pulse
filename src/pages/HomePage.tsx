import React, { useMemo } from 'react';
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
    const sections = useMemo(() => [
        { id: "section1", content: <AnimatedBarOne /> },
        { id: "section2", content: <AnimatedBarTwo /> },
        { id: "section3", content: <AnimatedBarThree /> },
    ], []);

    return (
        <div className='mainWrapper'>
            <Header />
            <Hero />
            <ContentSwitcher sections={sections} />

            <div className="sections-container">     
                {sections.map(({ id }) => (
                    <Section
                        key={id}
                        id={id}
                        title={
                            id === "section1" ? "Innovation in financial technology"
                            : id === "section2" ? "Individual financial solutions"
                            : "The future of finance is in your hands"
                        }
                        description={
                            id === "section1" ? "Explore the latest trends in fintech, digital banking and blockchain that are changing the future of finance."
                            : id === "section2" ? "We create financial instruments tailored to your needs - from lending to investment strategies."
                            : "Be part of the digital revolution - invest, manage finances and create wealth."
                        }
                        buttonText={id === "section1" ? "Learn More" : id === "section2" ? "Explore" : "Join Now"}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}
