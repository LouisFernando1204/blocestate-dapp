import { useEffect, useState, useRef } from "react";
import heroImage from "../../assets/heroImage.webp";
import { Link } from "react-router-dom";

const HeroSections = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const textRef = useRef(null);

    // Update offsetY based on scroll position for parallax effect
    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer for text content to trigger animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTextVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the text content is visible
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="h-screen w-full bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPositionY: `${offsetY * 0.5}px`, // Parallax effect
            }}
        >
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Main Content with On-Appear Animation */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 text-white">
                <div
                    ref={textRef}
                    className={`max-w-lg transition-opacity duration-3000 ease-out transform ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <p className="text-sm uppercase tracking-widest mb-4">
                        The Future of Secure Real Estate Auctions in Indonesia
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                        BlocEstate
                    </h1>
                    <p className="text-md md:text-lg font-light mb-8">
                        BlocEstate leverages blockchain technology on the ICP network to
                        offer secure and transparent real estate auctions exclusively for
                        Indonesian users by KYC verification, fostering a trusted
                        environment for real estate transactions.
                    </p>
                    {/* Button Positioned Below Text */}
                    <Link to="/auction">
                    <button className="mt-6 px-8 py-4 bg-[#333333] text-[#e5e5e5] text-lg font-semibold rounded-md shadow-lg hover:bg-[#4d4d4d] transition duration-300">
                        See Auctions
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSections;