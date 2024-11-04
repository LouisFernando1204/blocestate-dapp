import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { decideFinalBid, getAllAuctions } from "../service/auction";
import LoadingScreen from "../components/ui/loading-screen";
import { convertTimestamp, truncate } from "../lib/utils";
import Avatar from "boring-avatars";
import { bidAuction, getAllParticipants } from "../service/participant";
import Swal from "sweetalert2";

const AuctionDetail = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState({});
  const [participants, setParticipants] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBid, setLoadingBid] = useState(false);
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
        handleAuctionWinner();
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
        setShowSuccessAlert(true);
      }
    }
  };

  useEffect(() => {
    if (loadingBid == false && showSuccessAlert == true) {
      successAlert();
    }
  }, [id, loadingBid, showSuccessAlert]);

  useEffect(() => {
    if (auction) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
        console.log(timeLeft.seconds);

        if (
          timeLeft.days === 0 &&
          timeLeft.hours === 0 &&
          timeLeft.minutes === 0 &&
          timeLeft.seconds === 0
        ) {
          if (participants[0] != null) {
            processAuctionWinner();
          }
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [auction, id]);

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
    try {
      await decideFinalBid(
        participants[0].user,
        auction.address,
        participants[0].amount,
        auction.id
      );
    } catch (error) {
      console.log(error);
    } finally {
      
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
    if (loadingAuction == false && loadingParticipants == false) {
      const delayTimer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(delayTimer);
    }
  }, [id, loadingAuction, loadingParticipants]);

  if (loading || loadingBid) {
    return <LoadingScreen />;
  }

  return (
    <div className="mt-32 container mx-auto md:px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="relative flex flex-col w-full items-center">
            <div className="relative self-center justify-center items-center flex">
              <div className="absolute top-2 left-2 z-10 flex items-center gap-4 p-4 text-white bg-darkBrown shadow-md rounded-br-xl">
                <p>{auction.propertyType}</p>
              </div>
              <img
                src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
                alt="Product"
                className="w-full h-full rounded-lg shadow-md mb-4"
                id="mainImage"
              />
            </div>

            <div className="flex py-4 justify-center">
              <img
                src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
                alt="Thumbnail 0"
                className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* <!-- Product Details --> */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{auction.address}</h2>
          <p className="text-gray-600 mb-4">
            {auction.city}, {auction.province}, {auction.postalCode}
          </p>
          <div className="mb-4">
            {/* Ini aku ambil dari yg bid terbesar currently! */}
            <span className="text-3xl font-bold mr-2 animate-pulse">
              {participants[0] ? participants[0].amount : 0} ICP
            </span>
            <span className="text-gray-500">from {auction.startPrice} ICP</span>
          </div>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-1.5">
              <img
                className="w-6"
                src="https://img.icons8.com/material-sharp/24/calendar--v1.png"
                alt="calendar--v1"
              />
              <p className="text-md font-medium text-gray-500 ">
                {convertTimestamp(auction.startAuction)}
              </p>
            </div>
            <div className="flex flex-row gap-1.5">
              <img
                className="w-6"
                src="https://img.icons8.com/ios/50/arrow--v1.png"
                alt="arrow--v1"
              />
              <p className="text-md font-semibold text-red-500 ">
                {convertTimestamp(auction.endAuction)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center md:justify-start w-full gap-4 count-down-main">
            <div className="timer w-16">
              <div className=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                <h3 className="countdown-element days font-Cormorant font-semibold text-2xl text-white text-center">
                  {timeLeft.days}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-medium text-gray-900 mt-1 text-center w-full">
                days
              </p>
            </div>
            <div className="timer w-16">
              <div className=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                <h3 className="countdown-element hours font-Cormorant font-semibold text-2xl text-white text-center">
                  {timeLeft.hours}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
                hours
              </p>
            </div>
            <div className="timer w-16">
              <div className=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                <h3 className="countdown-element minutes font-Cormorant font-semibold text-2xl text-white text-center">
                  {timeLeft.minutes}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
                minutes
              </p>
            </div>
            <div className="timer w-16">
              <div className=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden ">
                <h3 className="countdown-element seconds font-Cormorant font-semibold text-2xl text-white text-center animate-countinsecond">
                  {timeLeft.seconds}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
                seconds
              </p>
            </div>
          </div>

          <p className="text-gray-700 mt-6 mb-4">{auction.description}</p>
          <p className="text-gray-700 mb-6">
            <span className="font-semibold">Area:</span> {auction.houseArea} m
            <sup></sup> | <span className="font-semibold">Year Built:</span>{" "}
            {auction.yearBuilt} | Created by{" "}
            <span className="text-indigo-500 font-semibold">
              {auction.creator}
            </span>
          </p>

          {/* Modal Toggle */}

          <div className="flex justify-center items-center md:justify-start md:items-start space-x-4 mb-6">
            <button
              onClick={() => setOpenModal(true)}
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className="bg-amber-900 flex gap-2 items-center text-white px-6 py-4 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <img className="w-8" src="\images\bidding.png" alt="arrow--v1" />
              <p className="text-xl">Bid Now!</p>
            </button>
          </div>

          {openModal && (
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50 justify-center items-center w-screen h-screen">
              <div className="relative p-4 max-w-xl mx-auto my-auto max-h-xl">
                <div className="relative bg-white rounded-lg shadow">
                  <button
                    onClick={() => setOpenModal(false)}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-amber-200 hover:text-gray-900 rounded-lg text-sm  ms-auto"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg md:text-xl font-semibold text-gray-90">
                      Insert your bidding amount!
                    </h3>

                    <p className="text-gray-600 mb-4">
                      Highest :{" "}
                      <span className="font-bold text-gray-800">
                        {participants[0] ? participants[0].amount : 0} ICP
                      </span>
                    </p>

                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        id="bidAmount"
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        placeholder={`${
                          participants[0]
                            ? participants[0].amount + 1
                            : auction.startPrice + 1
                        } ICP`}
                        className="mb-5 w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-500 text-center sm:text-start"
                        min="0"
                      />

                      <div className="flex items-center justify-center">
                        {/* Logic submit blm ada :D, ini baru ngehide, works the same as Cancel */}
                        <button
                          onClick={() => handleBid()}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        >
                          Bid
                        </button>
                        <button
                          onClick={() => setOpenModal(false)}
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-8 flex justify-center items-center gap-16">
        <div className="w-full max-w-2xl p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-xl sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900">
              Bidding History
            </h5>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all
            </a>
          </div>
          {participants && participants.length > 0 ? (
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {participants.map((participant, index) => (
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Avatar
                          className="w-8 h-8 rounded-full"
                          name={participant.user}
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {participant.user}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {participant.amount} ICP
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center w-full">NO BIDDING HISTORY</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
