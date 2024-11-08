import { pdf } from "@react-pdf/renderer";
import Certificate from "./Certificate";
import { saveAs } from "file-saver";
import { useEffect } from "react";
import HeroSections from "../components/sections/HeroSections";

const Home = () => {
  useEffect(() => {
    const handleClick = async () => {
      try {
        const fileName = "certificate.pdf";
        const blob = await pdf(
          <Certificate
            certificateNumber={100}
            province={"East Java"}
            city={"Surabaya"}
          />,
        ).toBlob();
        saveAs(blob, fileName);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    // handleClick();
  }, []);

  return (
    <div>
      <HeroSections />
      <AdvantageSection />
      <RecommendedSection />
      <Footer />
      <Navbar />
    </div>
  );
};

export default Home;
