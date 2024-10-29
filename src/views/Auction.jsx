"use client";
import React, { useEffect, useState, Suspense } from "react";
import { globeConfig, sampleArcs } from "../components/ui/globe";


const World = React.lazy(() =>
  import("../components/ui/globe").then((m) => ({ default: m.World }))
);

const Auction = () => {
  const [errorMessage, setErrorMessage] = useState(null); // Define errorMessage to avoid undefined error

  const dummyData = {
    ICP_UserBalance: 100,
    propertyAuctionCards: [
      { address: "Bikini Bottom No. 42, Los Angeles", propertyType: "House", startingBid: 5, startBid_Date: "2024-05-05", endBit_Date: "2024-05-19", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/380dbd01-38ee-4146-93df-31ce051f4b83/dfodfos-503fd0f7-8823-4c7d-ab84-753ed00e5e93.png/v1/fill/w_847,h_943,q_70,strp/_sbsp__the_chum_bucket_by_spongedrew250_dfodfos-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM4MGRiZDAxLTM4ZWUtNDE0Ni05M2RmLTMxY2UwNTFmNGI4M1wvZGZvZGZvcy01MDNmZDBmNy04ODIzLTRjN2QtYWI4NC03NTNlZDAwZTVlOTMucG5nIiwiaGVpZ2h0IjoiPD0yMTM2Iiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMzgwZGJkMDEtMzhlZS00MTQ2LTkzZGYtMzFjZTA1MWY0YjgzXC9zcG9uZ2VkcmV3MjUwLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.qGf1PFS1m4MBgmH9wnHwcHWB0mKU9dKMLCZxEzkRw5c", area: 240 },
      { address: "International House II, 45 Jurye-ro", propertyType: "Student Dormitory", startingBid: 25, startBid_Date: "2024-05-8", endBit_Date: "2024-05-22", image: "https://i.namu.wiki/i/qW2jMif6OYol0suRznfNCRWwxxoPJkfz26RP2CFBytbiDxXfXzVljtawQnSUfSVAvbUjiRW6hKWvASvIR7QPRg.webp", area: 2000 },
      { address: "Jl. HR Muhammad No. 25, Pradahkalikendal", propertyType: "Surga Dunia", startingBid: 200, startBid_Date: "2024-05-19", endBit_Date: "2024-06-01", image: "https://imgcdn.espos.id/@espos/images/2022/10/gacoan.jpg", area: 1250 },
      { address: "Jl. Gajahmada No.107, Miroto, Semarang", propertyType: "Restaurant", startingBid: 175, startBid_Date: "2024-05-8", endBit_Date: "2024-05-22", image: "https://indonesiatraveler.id/wp-content/uploads/2020/03/Lunpia-Cik-Me-Me3.jpg", area: 1089 },
    ],
  };

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
          <section class="mt-20 bg-gray-50 py-8 antialiased  md:py-12">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

              {/* <!-- Heading & Filters --> */}
              <div class="items-center justify-between space-y-4 sm:flex sm:space-y-0 mb-8">
                <div class="mt-3 flex flex-col md:flex-row items-end justify-center space-x-4">
                  <h2 class="text-3xl font-semibold text-gray-900 text-center md:text-start">Your Balance: {dummyData.ICP_UserBalance} ICP </h2>
                  <h3 class="italic font-light text-gray-500 sm:text-xl text-center md:text-start">"Find your dream property"</h3>
                </div>
                <div class="">
                  <form class="mx-auto">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative w-full">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                      </div>
                      <input type="search" id="default-search" class="block w-full md:w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500" placeholder=" Cozy House..." required />
                      <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-darkBrown hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                  </form>
                </div>

              </div>

              {/* <!-- Products Grid --> */}
              <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {dummyData.propertyAuctionCards.map((auction, index) => (

                  <div
                    key={index}
                    class="rounded-lg border border-gray-200 bg-white p-6 shadow-xl hover:scale-105 duration-200 ">

                    <a href={`/auction/${index}`}>
                      <div class="h-56 w-full">
                        <img class="mx-auto h-full " src={auction.image} alt="" />
                      </div>

                      <div class="pt-6">
                        <a class="text-lg font-semibold leading-tight text-gray-900 hover:underline ">{auction.address}</a>
                        <p class="mt-1 text-sm font-medium text-gray-500 ">{auction.propertyType} | {auction.area} ㎡</p>

                        <ul class="mt-2 flex items-center gap-2">
                          <li class="flex items-center gap-2">
                            <img class="w-4" src="https://img.icons8.com/material-sharp/24/calendar--v1.png" alt="calendar--v1" />
                            <p class="text-sm font-medium text-gray-500 ">{auction.startBid_Date}</p>
                          </li>

                          <li class="flex items-center gap-2">
                            <img class="w-4" src="https://img.icons8.com/ios/50/arrow--v1.png" alt="arrow--v1" />
                            <p class="text-sm font-medium text-gray-500 ">{auction.endBit_Date}</p>
                          </li>
                        </ul>

                        <div class="mt-4 flex items-center justify-between gap-4">
                          <div>
                            <p class="text-sm font-medium text-gray-500 ">Start from</p>
                            <p class="text-2xl font-extrabold leading-tight text-gray-900 ">{auction.startingBid} ICP</p>
                          </div>

                          <button type="button" class="inline-flex items-center rounded-lg bg-darkBrown px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none focus:ring-4  focus:ring-primary-300">
                            <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                            </svg>
                            Bid
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}

              </div>

              <div class="w-full text-center mt-12">
                <button type="button" class="rounded-lg border border-amber-200 bg-darkBrown px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-800 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-amber-400">Show more</button>
              </div>
            </div>
          </section>

          <div className="flex flex-col items-center mx-auto w-full relative overflow-hidden h-[20rem] lg:h-[40rem] px-8 sm:px-10">
            <h1 className="text-3xl font-semibold text-gray-900 text-center">
              Discover Property Auctions Worldwide, Secure and Easy
            </h1>
            <p className="text-lg font-light text-gray-500 text-center">
              Empowered by blockchain, find and bid on properties seamlessly from anywhere in the world.
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

export default Auction