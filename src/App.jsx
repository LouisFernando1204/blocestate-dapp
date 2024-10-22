import { Route, Routes } from "react-router-dom";
import Footer from "./components/fixed/Footer";
import Navbar from "./components/fixed/Navbar";
import AuctionDetail from "./views/AuctionDetail";
import Verification from "./views/Verification";
import Home from "./views/Home";
import Auction from "./views/Auction";
import { CreateAuction } from "./views/CreateAuction";
import { connectWallet, getActorWithLogin, getActorWithoutLogin } from "./service/connector";
import { useEffect, useState } from "react";

function App() {
  const [connectedPrincipal, setConnectedPrincipal] = useState("");

  const handleConnect = async () => {
    const principal = await connectWallet();
    if (principal) {
      setConnectedPrincipal(principal);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (connectedPrincipal) {
        const data = await getActorWithLogin();
        if (data) {
          const bal = await data.getUserPrincipalArray();
          console.log(bal);
        }
      }
    };
    fetchData();
  }, [connectedPrincipal]);

  return (
    <div className="font-poppins mx-10">
      <Navbar handleConnect={handleConnect} principal={connectedPrincipal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/create_auction" element={<CreateAuction />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
