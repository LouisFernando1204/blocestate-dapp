import { pdf } from "@react-pdf/renderer";
import Certificate from "./Certificate";
import { saveAs } from 'file-saver';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const handleClick = async () => {
      try {
        const fileName = 'certificate.pdf';
        const blob = await pdf(<Certificate
          certificateNumber={100}
          province={"East Java"}
          city={"Surabaya"}
        />).toBlob();
        saveAs(blob, fileName);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    // handleClick();  
  }, [])
  
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex officiis
      fugiat dolore, explicabo ut est nihil sit optio? Minus autem architecto
      ducimus aspernatur voluptates dignissimos incidunt recusandae maiores non.
    </div>
  );
};

export default Home;
