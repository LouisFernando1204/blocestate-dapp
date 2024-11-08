import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  decideFinalBid,
  getAllAuctions,
  getFinalBids,
} from "../service/auction";
import LoadingScreen from "../components/ui/loading-screen";
import { convertTimestamp, truncate } from "../lib/utils";
import Avatar from "boring-avatars";
import { bidAuction, getAllParticipants } from "../service/participant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import Certificate from "./Certificate";

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState({});
  const [participants, setParticipants] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [hasWinner, setHasWinner] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingBid, setLoadingBid] = useState(false);
  const [loadingFinalBid, setLoadingFinalBid] = useState(false);
  const [loadingWinner, setLoadingWinner] = useState(false);
  const [loadingAuction, setLoadingAuction] = useState(false);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [openModal, setOpenModal] = useState(false);
  const [bid, setBid] = useState("");

  function calculateTimeLeft() {
    if (auction) {
      const now = Math.floor(new Date().getTime() / 1000);
      const difference = auction.endAuction - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (60 * 60 * 24));
      const hours = Math.floor((difference / (60 * 60)) % 24);
      const minutes = Math.floor((difference / 60) % 60);
      const seconds = Math.floor(difference % 60);

      return { days, hours, minutes, seconds };
    }
  }

  const successAlert = () => {
    Swal.fire({
      text: "Your bid has been successfully placed!",
      icon: "success",
      confirmButtonText: "Done",
      confirmButtonColor: "#1f6feb",
      customClass: {
        confirmButton: "w-full",
      },
    });
  };

  const winnerAlert = (principal) => {
    Swal.fire({
      text: `Congratulation to ${principal} for winning this auction!`,
      icon: "success",
      confirmButtonText: "Download Certificate Here!",
      confirmButtonColor: "#1f6feb",
      customClass: {
        confirmButton: "w-full",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleFinalProcess();
      }
    });
  };

  const failedAlert = () => {
    Swal.fire({
      text: "Oops... There's something wrong while placing your bid. Please try again!",
      icon: "error",
      confirmButtonText: "Done",
      confirmButtonColor: "#cc0029",
    });
  };

  const errorRequiredGreaterAmount = () => {
    Swal.fire({
      text: "Oops... your bid is below the higher price. Please increase your bid!",
      icon: "error",
      confirmButtonText: "Close",
      confirmButtonColor: "#cc0029",
    });
  };

  const handleFinalProcess = async () => {
    try {
      const fileName = "certificate.pdf";
      const blob = await pdf(
        <Certificate
          certificateNumber={auction.certificateNumber}
          province={auction.province}
          city={auction.city}
        />,
      ).toBlob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      navigate("/");
    }
  };

  const handleBid = async () => {
    let error = false;
    try {
      setLoadingBid(true);
      if (
        (participants[0] != null && parseInt(bid) > participants[0].amount) ||
        (participants[0] == null && parseInt(bid) > auction.startPrice)
      ) {
        await bidAuction(auction.id, parseInt(bid));
      } else {
        error = true;
        errorRequiredGreaterAmount();
      }
    } catch (error) {
      failedAlert();
      console.log(error);
    } finally {
      try {
        await fetchParticipants();
      } catch (error) {
        console.log(error);
      } finally {
        setOpenModal(false);
        setBid("");
        setLoadingBid(false);
      }
      if (error == false) {
        successAlert();
      }
    }
  };

  useEffect(() => {
    const fetchWinner = async () => {
      setLoadingFinalBid(true);
      try {
        const data = await getFinalBids();
        const isExist = data.some(
          (participant) => participant.auctionId === auction.id,
        );
        setHasWinner(isExist);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFinalBid(false);
      }
    };
    if (auction) {
      fetchWinner();
    }
  }, [id, auction]);

  useEffect(() => {
    if (auction) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());

        console.log(timeLeft);

        if (
          timeLeft.days <= 0 &&
          timeLeft.hours <= 0 &&
          timeLeft.minutes <= 0 &&
          timeLeft.seconds <= 0 &&
          participants[0] != null &&
          hasWinner === false
        ) {
          setHasWinner(true);
          processAuctionWinner();
          console.log("loading : " + loading);
          console.log("loading winner : " + loadingWinner);
          console.log("has winner : " + hasWinner);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [auction, id, hasWinner, timeLeft, participants]);

  useEffect(() => {
    setLoadingAuction(true);
    const fetchAuction = async () => {
      try {
        const data = await getAllAuctions();
        const detailAuction = data.find((auction) => {
          return auction.id === parseInt(id);
        });
        setAuction(detailAuction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingAuction(false);
      }
    };
    fetchAuction();
  }, [id]);

  const processAuctionWinner = async () => {
    setLoadingWinner(true);
    try {
      await decideFinalBid(
        participants[0].user,
        auction.address,
        participants[0].amount,
        auction.id,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingWinner(false);
      winnerAlert(participants[0].user);
    }
  };

  const fetchParticipants = async () => {
    try {
      if (auction) {
        const allParticipants = await getAllParticipants();

        if (allParticipants) {
          const thisAuctionParticipants = allParticipants
            .filter((participant) => {
              return participant.auctionId === auction.id;
            })
            .sort((a, b) => b.amount - a.amount);
          setParticipants(thisAuctionParticipants || []);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingParticipants(false);
    }
  };

  useEffect(() => {
    setLoadingParticipants(true);
    if (auction) {
      fetchParticipants();
    }
  }, [id, auction]);

  useEffect(() => {
    setLoading(true);

    if (
      loadingAuction == false &&
      loadingParticipants == false &&
      loadingFinalBid == false
    ) {
      const delayTimer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(delayTimer);
    }
  }, [id, loadingAuction, loadingParticipants, loadingFinalBid]);

  if (loading || loadingBid || loadingWinner) {
    return <LoadingScreen />;
  }

  return (
    <div className="mt-32 container mx-auto md:px-4 py-8 bg-[#1a1a1a] text-white">
      <div className="flex flex-wrap -mx-4">
        {/* Auction Image */}
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="relative flex flex-col w-full items-center">
            <div className="relative flex justify-center items-center">
              <div className="absolute top-2 left-2 z-10 flex items-center gap-4 p-4 text-white bg-[#333333] shadow-md rounded-br-xl">
                <p>{auction.propertyType}</p>
              </div>
              <img
                src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
                alt="Product"
                className="w-full h-full rounded-lg shadow-lg mb-4"
              />
            </div>
            <div className="flex py-4 justify-center">
              <img
                src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
                alt="Thumbnail"
                className="w-16 h-16 rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{auction.address}</h2>
          <p className="text-gray-400 mb-4">
            {auction.city}, {auction.province}, {auction.postalCode}
          </p>
          <div className="mb-4">
            <span className="text-3xl font-bold mr-2 animate-pulse">
              {participants[0] ? participants[0].amount : 0} ICP
            </span>
            <span className="text-gray-500">from {auction.startPrice} ICP</span>
          </div>
          {/* Countdown Timer */}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-4 count-down-main">
            {/* Render each countdown component with similar styling */}
            {Object.entries(timeLeft).map(([label, value], index) => (
              <div key={index} className="timer w-16">
                <div className="bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                  <h3 className="countdown-element font-semibold text-2xl text-white text-center">
                    {value}
                  </h3>
                </div>
                <p className="text-lg font-medium text-gray-400 text-center">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 mt-6 mb-4">{auction.description}</p>
          <p className="text-gray-500 mb-6">
            <span className="font-semibold">Area:</span> {auction.houseArea} m
            <sup>2</sup> | <span className="font-semibold">Year Built:</span>{" "}
            {auction.yearBuilt}
          </p>

          {/* Bid Modal Toggle */}
          <button
            onClick={() => setOpenModal(true)}
            className="bg-amber-900 flex gap-2 items-center text-white px-6 py-4 rounded-xl hover:bg-amber-700"
          >
            <img className="w-8" src="/images/bidding.png" alt="Bid Icon" />
            <p className="text-xl">Bid Now!</p>
          </button>

          {/* Bidding Modal */}
          {openModal && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
              <div className="relative bg-[#1a1a1a] text-white p-6 max-w-md rounded-lg shadow-lg">
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 right-3 text-gray-400"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
                <h3 className="mb-5 text-lg font-semibold">Enter your bid</h3>
                <p className="text-gray-500 mb-4">
                  Highest Bid:{" "}
                  <span className="font-bold">
                    {participants[0] ? participants[0].amount : 0} ICP
                  </span>
                </p>
                <input
                  type="number"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                  className="mb-5 w-full px-4 py-2 text-black text-center rounded-lg border border-gray-500 focus:border-indigo-500"
                />
                <div className="flex justify-around">
                  <button
                    onClick={() => handleBid()}
                    className="bg-green-600 px-4 py-2 text-white rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;

