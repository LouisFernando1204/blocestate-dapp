import { Route, Routes } from "react-router-dom"
import Footer from "./components/fixed/Footer"
import Navbar from "./components/fixed/Navbar"
import AuctionDetail from "./views/AuctionDetail"
import Verification from "./views/Verification"
import Home from "./views/Home"
import Auction from "./views/Auction"
import { CreateAuction } from "./views/CreateAuction"

function App() {

  return (
    <div className="font-poppins mx-10">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Verification />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/create_auction" element={<CreateAuction />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
