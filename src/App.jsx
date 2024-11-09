import { Route, Routes } from "react-router-dom"
import AuctionDetail from "./views/AuctionDetail"
import Verification from "./views/Verification"
import Home from "./views/Home"
import Auction from "./views/Auction"
import { CreateAuction } from "./views/CreateAuction"
import Layout from "./components/fixed/Layout"
import {
  connectWallet,
} from "./service/connector";
import { useEffect, useState } from "react";

function App() {
  const [connectedPrincipal, setConnectedPrincipal] = useState("");
  const [userBalance, setUserBalance] = useState(100);

  const handleConnect = async () => {
    const principal = await connectWallet();
    if (principal) {
      setConnectedPrincipal(principal);
      console.log("Connected to wallet:", principal);
    }
  };

  useEffect(() => { }, [connectedPrincipal]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout handleConnect={handleConnect} principal={connectedPrincipal} />}
      >
        <Route path="/" element={<Home principal={connectedPrincipal} />} />
        <Route path="/auction" element={<Auction userBalance={userBalance} />} />
        <Route path="/auction/:id" element={<AuctionDetail userBalance={userBalance} setUserBalance={setUserBalance} />} />
        <Route path="/create_auction" element={<CreateAuction />} />
        <Route path="/verification" element={<Verification principal={connectedPrincipal} />} />
      </Route>
    </Routes>
  )
}

export default App