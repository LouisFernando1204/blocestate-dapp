/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import AdvantageSection from "../components/sections/AdvantagesSection";
import RecommendedSection from "../components/sections/RecommendedSection";
import LoadingScreen from "../components/ui/loading-screen";
import { getAllAuctions } from "../service/auction";
import { checkParticipantVerification } from "../service/participant";

const Home = ({ principal, isVerify, setIsVerify }) => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const data = await getAllAuctions();
        setAuctions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  useEffect(() => {
    const verifyParticipant = async () => {
      try {
        setLoading(true);
        await checkParticipantVerification();
        navigate("/verification");
      } catch (error) {
        console.log(error);
        navigate("/verification");
      } finally {
        setLoading(false);
        setIsVerify(true);
      }
    };

    if (principal && isVerify == false) {
      verifyParticipant();
    }
  }, [principal, navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <HeroSection />
      <AdvantageSection />
      <RecommendedSection auctions={auctions} />
    </div>
  );
};

export default Home;