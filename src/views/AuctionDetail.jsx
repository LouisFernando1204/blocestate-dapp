import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllAuctions } from "../service/auction";
import LoadingScreen from "../components/ui/loading-screen";
import { convertTimestamp, truncate } from "../lib/utils";
import { Principal } from "@dfinity/principal";

const AuctionDetail = () => {
  const dummyData = {
    propertyImage: [
      "https://imgcdn.espos.id/@espos/images/2022/10/gacoan.jpg",
      "https://ex-pose.net/wp-content/uploads/2024/01/IMG-20240120-WA0007.jpg",
      "https://media.suara.com/pictures/1600x840/2024/05/01/68116-presiden-jokowi-makan-mi-gacoan-di-mataram.jpg",
      "https://asrinews.com/wp-content/uploads/2024/02/IMG_20240222_114134-scaled.jpg",
      "https://klikfakta.com/wp-content/uploads/2024/06/IMG-20240612-WA0002.jpg",
    ],
    address: "Jl. HR Muhammad No. 25, Pradahkalikendal",
    city: "Surabaya",
    province: "East Java",
    postal_code: "22543",
    description:
      "PENGEN UDANG KEJU GACOAN YAOLO Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex officiis fugiat dolore, explicabo ut est nihil sit optio? Minus autem architecto ducimus aspernatur voluptates dignissimos incidunt recusandae maiores non.",
    area: 1250,
    yearBuilt: 2020,

    startBid_date: "2024-10-16",
    endBid_date: "2024-10-31",
    endBid_hour: "23:59",

    startingBid: 200,
    propertyType: "Surga Dunia",

    timerCountdown_beforeStart_Hour: 0,
    timerCountdown_beforeStart_Minute: 0,
    timerCountdown_beforeStart_Second: 0,
    timerCountdown_toEnd_Hour: 3,
    timerCountdown_toEnd_Minute: 20,
    timerCountdown_toEnd_Second: 15,

    users: [
      {
        name: "Yebol",
        bid: 400,
        date: "2024-05-22",
        image:
          "https://media.licdn.com/dms/image/v2/C4E03AQHFxCF2uitxvQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1641821985394?e=1735776000&v=beta&t=jRpVRwS-QnA6w_EvYNbu56HXj9GCqImdQYPwt4Tcf5U",
      },
      {
        name: "Yanto",
        bid: 380,
        date: "2024-05-22",
        image:
          "https://stickershop.line-scdn.net/stickershop/v1/product/23099050/LINEStorePC/main.png?v=1",
      },
      {
        name: "Fredrinn",
        bid: 225,
        date: "2024-05-22",
        image:
          "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p3/70/2024/06/30/Hero-Counter-Fredrinn-1044367287.jpg",
      },
      {
        name: "Bibi",
        bid: 150,
        date: "2024-05-21",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTY3T8aHotuNtZbCfPW1-hXehAOYuau-FDOQ&s",
      },
      {
        name: "Suisei",
        bid: 140,
        date: "2024-05-21",
        image:
          "https://m.media-amazon.com/images/I/71LwoUyUSKL._AC_UF894,1000_QL80_.jpg",
      },
    ],

    auctionCreator: [
      {
        name: "Joren",
        profilePicture:
          "https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/448799816_3341154296027992_6882837168921415155_n.jpg?stp=c47.14.173.172a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=JjBfjPBvwCgQ7kNvgFTiVtU&_nc_zt=24&_nc_ht=scontent-gmp1-1.xx&_nc_gid=ADa39LehomRqANBU4mO37Re&oh=00_AYCzkdE9KcIakJigMv32TijD6brj65_hp9ZRMq3FlfbP4g&oe=67256F31",
        totalPropertyBid: 3,
      },
    ],
  };
  const { id } = useParams();
  const [auction, setAuction] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Countdown timer code

  // let dest = new Date(
  //   `${dummyData.endBid_date}T${dummyData.endBid_hour}:00`
  // ).getTime();
  // let x = setInterval(function () {
  //   let now = new Date().getTime();
  //   let diff = dest - now;

  //   if (diff <= 0) {
  //     clearInterval(x); // Stop the countdown
  //     return; // Exit the function
  //   }

  //   let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //   let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //   let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  //   if (days < 10) {
  //     days = `0${days}`;
  //   }
  //   if (hours < 10) {
  //     hours = `0${hours}`;
  //   }
  //   if (minutes < 10) {
  //     minutes = `0${minutes}`;
  //   }
  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }

  //   let countdownElements =
  //     document.getElementsByClassName("countdown-element");

  //   for (let i = 0; i < countdownElements.length; i++) {
  //     let className = countdownElements[i].classList[1]; // Get the second class name
  //     switch (className) {
  //       case "days":
  //         countdownElements[i].innerHTML = days;
  //         break;
  //       case "hours":
  //         countdownElements[i].innerHTML = hours;
  //         break;
  //       case "minutes":
  //         countdownElements[i].innerHTML = minutes;
  //         break;
  //       case "seconds":
  //         countdownElements[i].innerHTML = seconds;
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, 1000);

  function calculateTimeLeft() {
    if (auction) {
      const now = Math.floor(new Date().getTime() / 1000);
      const difference = auction.endAuction - now;
  
      const days = Math.floor(difference / (60 * 60 * 24));
      const hours = Math.floor((difference / (60 * 60)) % 24);
      const minutes = Math.floor((difference / 60) % 60);
      const seconds = Math.floor(difference % 60);

      console.log(days);
      console.log(hours);
      console.log(minutes)
      console.log(seconds)

      return { days, hours, minutes, seconds };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // console.log(timer.seconds)

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      }
    };
    fetchAuction();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="mt-32 container mx-auto md:px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        {/* <!-- Product Images --> */}
        <div className="relative w-full md:w-1/2 px-4 mb-8">
          <div className="absolute top-0 left-0 z-10 flex items-center gap-4 p-4 text-white bg-darkBrown shadow-md rounded-br-xl">
            <p>{auction.propertyType}</p>
          </div>
          <img
            src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
            alt="Product"
            className="w-auto h-auto rounded-lg shadow-md mb-4"
            id="mainImage"
          ></img>
          <div className="flex gap-4 py-4 justify-center overflow-x-auto">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
              alt="Thumbnail 0"
              className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
            />
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
              {dummyData.users[0].bid} ICP
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
              {truncate(auction.creator, 4, 4, 11)}
            </span>
          </p>

          {/* Modal Toggle */}

          <div className="flex justify-center items-center md:justify-start md:items-start space-x-4 mb-6">
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className="bg-amber-900 flex gap-2 items-center text-white px-6 py-4 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <img className="w-8" src="\images\bidding.png" alt="arrow--v1" />
              <p className="text-xl">Bid Now!</p>
            </button>
          </div>

          <div
            id="popup-modal"
            tabIndex="-1"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-amber-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="popup-modal"
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
                    Highest:{" "}
                    <span className="font-bold text-gray-800">
                      {dummyData.users[0].bid} ICP
                    </span>
                  </p>

                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      id="bidAmount"
                      placeholder={dummyData.users[0].bid + 1}
                      className="mb-5 w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-500 text-center sm:text-start"
                      min="0"
                    />

                    <div className="flex items-center justify-center">
                      {/* Logic submit blm ada :D, ini baru ngehide, works the same as Cancel */}
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Bid
                      </button>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-red-800 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

          {dummyData.users.map((user, index) => (
            <div key={index} className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.image}
                        alt="Neil image"
                      ></img>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{user.date}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      {user.bid} ICP
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
