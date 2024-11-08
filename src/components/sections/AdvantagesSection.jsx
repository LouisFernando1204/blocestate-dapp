import React, { useRef, useState, useEffect } from "react";
import {
  FaUniversity,
  FaUserCheck,
  FaBolt,
  FaChartLine,
  FaShieldAlt,
  FaUserFriends,
} from "react-icons/fa";

const AdvantageSection = () => {
  const [visibleCards, setVisibleCards] = useState({});
  const cardsRef = useRef([]);

  const cardsData = [
    {
      title: "Decentralization",
      description:
        "Enables the management of auctions without third parties, reducing the risk of fraud and increasing transparency.",
      icon: <FaUniversity className="text-4xl text-gray-200" />,
    },
    {
      title: "Verification",
      description:
        "The KYC process with facial recognition and ID verification ensures that users are Indonesian citizens.",
      icon: <FaUserCheck className="text-4xl text-gray-200" />,
    },
    {
      title: "Ease of Transactions",
      description:
        "Transactions are quick and direct using cryptocurrency, minimizing wait times and costs.",
      icon: <FaBolt className="text-4xl text-gray-200" />,
    },
    {
      title: "Real-Time Data Access",
      description:
        "Users can access auction information directly, including current prices and real estate status.",
      icon: <FaChartLine className="text-4xl text-gray-200" />,
    },
    {
      title: "Transaction Security",
      description:
        "Blockchain technology ensures that all transactions are recorded permanently, securely, and reliably.",
      icon: <FaShieldAlt className="text-4xl text-gray-200" />,
    },
    {
      title: "Intuitive User Experience",
      description:
        "A user-friendly interface makes it easy for participants to engage in auctions without difficulties.",
      icon: <FaUserFriends className="text-4xl text-gray-200" />,
    },
  ];

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, cardsData.length);

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
  }, [cardsData.length]);

  return (
    <div
      className="relative w-full py-16 bg-cover bg-center"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 lg:px-24 text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          Why Choose BlocEstate for Your Real Estate Auctions?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg transition-all duration-500 ease-in-out ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              } hover:bg-white/20 hover:shadow-2xl`}
              style={{
                transitionDelay: visibleCards[index] ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvantageSection;


