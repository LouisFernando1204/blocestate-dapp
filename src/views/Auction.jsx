"use client";
import React, { useEffect, useState, Suspense } from "react";
import { globeConfig, sampleArcs } from "../components/ui/globe";
import { getAllAuctions } from "../service/auction";
import LoadingScreen from "../components/ui/loading-screen";
import { convertTimestamp } from "../lib/utils";
import { Link } from "react-router-dom";

const World = React.lazy(() =>
  import("../components/ui/globe").then((m) => ({ default: m.World })),
);

const Auction = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);

  const dummyData = {
    ICP_UserBalance: 100,
  };

  useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true);
      try {
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
      {errorMessage ? (
        <ErrorMessage
          errorCode={400}
          errorName={"Bad Request"}
          errorMessage={errorMessage}
        />
      ) : (
        <>
          <section className="mt-20 bg-[#1a1a1a] py-8 antialiased md:py-12 backdrop-blur-lg bg-opacity-90">
            <div className="mx-auto max-w-screen-xl">
              {/* Heading & Filters */}
              <div className="items-center justify-between space-y-4 sm:flex sm:space-y-0 mb-8">
                <div className="mt-3 flex flex-col md:flex-row items-center justify-center space-x-4">
                  <h2 className="text-3xl font-semibold text-[#e5e5e5] text-center md:text-start">
                    Your Balance: {dummyData.ICP_UserBalance} ICP{" "}
                  </h2>
                  <h3 className="italic font-light text-gray-400 sm:text-xl text-center md:text-start">
                    "Find your dream property"
                  </h3>
                </div>
                <div>
                  <form className="mx-auto">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full md:w-96 p-4 ps-10 text-sm text-white bg-[#333333] border border-gray-500 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Cozy House..."
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-[#444444] hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-500 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Products Grid */}
              <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {auctions.map((auction, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-600 bg-[#2a2a2a] p-6 shadow-lg hover:scale-105 duration-200"
                  >
                    <Link to={`/auction/${auction.id}`}>
                      <div className="relative h-56 w-full">
                        <div className="absolute top-0 left-0 z-10 flex items-center gap-4 p-2 text-sm text-white bg-[#444444] shadow-md rounded-br-xl">
                          <p>{auction.propertyType}</p>
                        </div>
                        <img
                          className="mx-auto h-full"
                          src={`https://gateway.pinata.cloud/ipfs/${auction.image}`}
                          alt="Auction Property"
                        />
                      </div>

                      <div className="pt-6">
                        <a className="text-lg font-semibold leading-tight text-[#e5e5e5] hover:underline">
                          {auction.address}, {auction.city}, {auction.province},{" "}
                          {auction.postalCode}
                        </a>
                        <p className="mt-1 text-sm font-medium text-gray-400">
                          {auction.houseArea} m<sup>2</sup>
                        </p>

                        <ul className="mt-2 flex items-center gap-2">
                          <li className="flex items-center gap-2">
                            <img
                              className="w-4"
                              src="https://img.icons8.com/material-sharp/24/calendar--v1.png"
                              alt="calendar"
                            />
                            <p className="text-sm font-medium text-gray-400">
                              {convertTimestamp(auction.startAuction)}
                            </p>
                          </li>

                          <li className="flex items-center gap-2">
                            <img
                              className="w-4"
                              src="https://img.icons8.com/ios/50/arrow--v1.png"
                              alt="arrow"
                            />
                            <p className="text-sm font-medium text-gray-400">
                              {convertTimestamp(auction.endAuction)}
                            </p>
                          </li>
                        </ul>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-400">
                              Start from
                            </p>
                            <p className="text-2xl font-extrabold leading-tight text-[#e5e5e5]">
                              {auction.startPrice} ICP
                            </p>
                          </div>

                          <button
                            type="button"
                            className="inline-flex items-center rounded-lg bg-amber-900 px-5 py-2.5 gap-2 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-600"
                          >
                            <img
                              className="w-4"
                              src="/images/bidding.png"
                              alt="Bid Icon"
                            />
                            Bid
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="w-full h-0.5 bg-gray-600 max-w-7xl" />

          {/* Globe Section */}
          <div className="flex flex-col items-center mx-auto w-full relative overflow-hidden h-[30rem] sm:h-[30rem] md:h-[40rem] px-4 sm:px-8">
            <h1 className="text-3xl font-semibold text-[#e5e5e5] text-center">
              Discover Property Auctions Worldwide, Secure and Easy
            </h1>
            <p className="mt-4 md:mt-2 text-lg font-light text-gray-400 text-center">
              Empowered by blockchain, find and bid on properties seamlessly
              from anywhere in the world.
            </p>

            <Suspense fallback={<div>Loading Globe...</div>}>
              <World data={sampleArcs} globeConfig={globeConfig} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default Auction;

