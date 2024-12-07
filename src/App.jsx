import { Route, Routes } from "react-router-dom"
import AuctionDetail from "./views/AuctionDetail"
import Verification from "./views/Verification"
import Home from "./views/Home"
import Auction from "./views/Auction"
import { CreateAuction } from "./views/CreateAuction"
import Layout from "./components/fixed/Layout"
import {
  connectInternetIdentity,
  getCurrentIdentity,
} from "./service/connector";
import { useEffect, useState } from "react";

function App() {
  const [connectedPrincipal, setConnectedPrincipal] = useState("");
  const [userBalance, setUserBalance] = useState(100);
  const [isVerify, setIsVerify] = useState(false);

  const handleConnect = async () => {
    try {
      await connectInternetIdentity();
    }
    catch (error) {
      console.log(error)
    }
    finally {
      const principal = getCurrentIdentity();
      if (principal) {
        setConnectedPrincipal(principal)
      }
    }
  };

  useEffect(() => { 
    console.log(isVerify)
  }, [connectedPrincipal, isVerify]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout handleConnect={handleConnect} principal={connectedPrincipal} />}
      >
        <Route path="/" element={<Home principal={connectedPrincipal} isVerify={isVerify} setIsVerify={setIsVerify} />} />
        <Route path="/auction" element={<Auction userBalance={userBalance} />} />
        <Route path="/auction/:id" element={<AuctionDetail userBalance={userBalance} setUserBalance={setUserBalance} />} />
        <Route path="/create_auction" element={<CreateAuction />} />
        <Route path="/verification" element={<Verification principal={connectedPrincipal} />} />
      </Route>
    </Routes>
  )
}

export default App