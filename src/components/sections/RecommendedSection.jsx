import React, { useRef, useState, useEffect } from "react";

// Dummy data for top 10 auctions
const dummyAuctions = [
  {
    title: "Luxury Villa in Bali",
    description: "A beautiful beachfront villa with stunning views.",
    endingSoon: "Ends in 2 hours",
  },
  {
    title: "Jakarta Apartment",
    description: "Modern apartment in the heart of Jakarta.",
    endingSoon: "Ends in 4 hours",
  },
  {
    title: "Surabaya Office Space",
    description: "Premium office space in the business district.",
    endingSoon: "Ends in 1 day",
  },
  {
    title: "Bandung Family Home",
    description: "Spacious home perfect for a family.",
    endingSoon: "Ends in 3 hours",
  },
  {
    title: "Jogja Beach House",
    description: "Cozy house with private beach access.",
    endingSoon: "Ends in 5 hours",
  },
  {
    title: "Semarang Penthouse",
    description: "Luxurious penthouse with panoramic city views.",
    endingSoon: "Ends in 2 days",
  },
  {
    title: "Medan Farmhouse",
    description: "Rustic farmhouse with large gardens.",
    endingSoon: "Ends in 6 hours",
  },
  {
    title: "Makassar Studio Apartment",
    description: "Compact and convenient studio apartment.",
    endingSoon: "Ends in 8 hours",
  },
  {
    title: "Bali Resort",
    description: "Exclusive resort property investment.",
    endingSoon: "Ends in 10 hours",
  },
  {
    title: "Lombok Mountain Retreat",
    description: "Secluded mountain retreat with modern amenities.",
    endingSoon: "Ends in 1 hour",
  },
];

const RecommendedSection = () => {
  const [visibleCards, setVisibleCards] = useState({});
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, dummyAuctions.length);

    cardsRef.current.forEach((card, index) => {
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

      if (card) observer.observe(card);
    });
  }, []);

  return (
    <div className="w-full py-16 px-8 md:px-16 lg:px-24 bg-[#1a1a1a] text-white relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Don’t Miss Out!
        </h2>
        <p className="text-gray-300 mb-12 text-lg">
          Here are the top 10 auctions ending soon
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dummyAuctions.map((auction, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg hover:bg-white/20 transition duration-300 transform ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`, // staggered delay
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{auction.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{auction.description}</p>
              <p className="text-gray-400 text-xs">{auction.endingSoon}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSection;


