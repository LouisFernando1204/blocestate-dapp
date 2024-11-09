/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { convertTimestamp } from "../../lib/utils";

const RecommendedSection = ({auctions}) => {
    const [visibleCards, setVisibleCards] = useState({});
    const cardsRef = useRef([]);

    useEffect(() => {
        if (auctions.length === 0) return; 

        cardsRef.current = cardsRef.current.slice(0, auctions.length);

        const observers = cardsRef.current.map((card, index) => {
            if (!card) return null; 

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibleCards((prevVisibleCards) => ({
                                ...prevVisibleCards,
                                [index]: true,
                            }));
                            observer.unobserve(entry.target); 
                        }
                    });
                },
                { threshold: 0.1 }
            );

            observer.observe(card);
            return observer;
        });

        return () => {
            observers.forEach((observer) => {
                if (observer) observer.disconnect();
            });
        };
    }, [auctions]); 

    return (
        <div className="w-full py-16 px-8 md:px-16 lg:px-24 bg-[#1a1a1a] text-white relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Don’t Miss Out!
                </h2>
                <p className="text-white mb-12 text-lg">
                    Here are the top auctions ending soon
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {auctions.map((auction, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className={`border-gray-200 bg-white hover:scale-105 p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg hover:bg-white/20 transition duration-300 transform ${visibleCards[index]
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                                }`}

                        >
                            <Link
                                to={`/auction/${auction.id}`}>
                                <div className="relative h-56 w-full">
                                    <div className="absolute top-0 left-0 z-10 flex items-center gap-4 p-2 text-sm text-white bg-darkBrown shadow-md rounded-br-xl">
                                        <p>{auction.propertyType}</p>
                                    </div>
                                    <img
                                        className="mx-auto h-full "
                                        src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
                                        alt=""
                                    />
                                </div>

                                <div className="pt-6 text-start">
                                    <p className="text-lg font-semibold leading-tight text-white hover:underline ">
                                        {auction.address}, {auction.city}, {auction.province}, {auction.postalCode}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        {auction.houseArea} m<sup>2</sup>
                                    </p>

                                    <ul className="mt-2 flex items-center gap-2">
                                        <li className="flex items-center gap-2">
                                            <img
                                                className="w-4"
                                                src="https://img.icons8.com/material-sharp/24/calendar--v1.png"
                                                alt="calendar--v1"
                                            />
                                            <p className="text-sm font-medium text-white ">
                                                {convertTimestamp(auction.startAuction)}
                                            </p>
                                        </li>

                                        <li className="flex items-center gap-2">
                                            <img
                                                className="w-4"
                                                src="https://img.icons8.com/ios/50/arrow--v1.png"
                                                alt="arrow--v1"
                                            />
                                            <p className="text-sm font-medium text-white ">
                                                {convertTimestamp(auction.endAuction)}
                                            </p>
                                        </li>
                                    </ul>

                                    <div className="mt-4 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-white ">
                                                Start from
                                            </p>
                                            <p className="text-2xl font-extrabold leading-tight text-white">
                                                {auction.startPrice} ICP
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-lg bg-amber-900 px-5 py-2.5 gap-2 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                                        >
                                            <img
                                                className="w-4"
                                                src="\images\bidding.png"
                                                alt="arrow--v1"
                                            />
                                            Bid
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendedSection;