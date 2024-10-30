const AuctionDetail = () => {
  const dummyData = {
    propertyImage: [
      "https://imgcdn.espos.id/@espos/images/2022/10/gacoan.jpg",
      "https://ex-pose.net/wp-content/uploads/2024/01/IMG-20240120-WA0007.jpg",
      "https://media.suara.com/pictures/1600x840/2024/05/01/68116-presiden-jokowi-makan-mi-gacoan-di-mataram.jpg",
      "https://asrinews.com/wp-content/uploads/2024/02/IMG_20240222_114134-scaled.jpg",
      "https://klikfakta.com/wp-content/uploads/2024/06/IMG-20240612-WA0002.jpg"
    ],
    address: "Jl. HR Muhammad No. 25, Pradahkalikendal",
    city: "Surabaya",
    province: "East Java",
    postal_code: "22543",
    description: "PENGEN UDANG KEJU GACOAN YAOLO Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ex officiis fugiat dolore, explicabo ut est nihil sit optio? Minus autem architecto ducimus aspernatur voluptates dignissimos incidunt recusandae maiores non.",
    area: 1250,
    yearBuilt: 2020,
    startBid_date: "2024-10-16",
    endBid_date: "2024-10-30",
    endBid_hour: "23:59",
    startingBid: 200,
    propertyType: "Surga Dunia",

    // btw ya ini countdownnya ak bikin keduanya
    timerCountdown_beforeStart_Hour: 0,
    timerCountdown_beforeStart_Minute: 0,
    timerCountdown_beforeStart_Second: 0,
    timerCountdown_toEnd_Hour: 3,
    timerCountdown_toEnd_Minute: 20,
    timerCountdown_toEnd_Second: 15,

    user: [
      {
        name: "Joren",
        bid: 400,
        date: "2024-05-20",
      },
      {
        name: "Yanto",
        bid: 380,
        date: "2024-05-21",
      },
      {
        name: "Fredrinn",
        bid: 225,
        date: "2024-05-22",
      },
    ],

    auctionCreator: [
      {
        name: "Joren",
        profilePicture: "https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-1/448799816_3341154296027992_6882837168921415155_n.jpg?stp=c47.14.173.172a_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=JjBfjPBvwCgQ7kNvgFTiVtU&_nc_zt=24&_nc_ht=scontent-gmp1-1.xx&_nc_gid=ADa39LehomRqANBU4mO37Re&oh=00_AYCzkdE9KcIakJigMv32TijD6brj65_hp9ZRMq3FlfbP4g&oe=67256F31",
        totalPropertyBid: 3
      }
    ]
  };

  const changeImage = (src) => {
    document.getElementById('mainImage').src = src;
  };

  let dest = new Date(`${dummyData.endBid_date}T${dummyData.endBid_hour}:00`).getTime();
  let x = setInterval(function () {
    let now = new Date().getTime();
    let diff = dest - now;

    if (diff <= 0) {
      clearInterval(x); // Stop the countdown
      return; // Exit the function
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days < 10) {
      days = `0${days}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    let countdownElements = document.getElementsByClassName("countdown-element");

    for (let i = 0; i < countdownElements.length; i++) {
      let className = countdownElements[i].classList[1]; // Get the second class name
      switch (className) {
        case "days":
          countdownElements[i].innerHTML = days;
          break;
        case "hours":
          countdownElements[i].innerHTML = hours;
          break;
        case "minutes":
          countdownElements[i].innerHTML = minutes;
          break;
        case "seconds":
          countdownElements[i].innerHTML = seconds;
          break;
        default:
          break;
      }
    }
  }, 1000);

  return (
    <div class="mt-32 container mx-auto md:px-4 py-8">
      <div class="flex flex-wrap -mx-4">
        {/* <!-- Product Images --> */}
        <div class="relative w-full md:w-1/2 px-4 mb-8">
          <div class="absolute top-0 left-0 z-10 flex items-center gap-4 p-4 text-white bg-darkBrown shadow-md rounded-br-xl">
            <p>{dummyData.propertyType}</p>
          </div>
          <img src={dummyData.propertyImage[0]} alt="Product"
            class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage"></img>
          <div class="flex gap-4 py-4 justify-center overflow-x-auto">
            <img
              src={dummyData.propertyImage[1]}
              alt="Thumbnail 1"
              className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              onClick={() => changeImage(dummyData.propertyImage[1])}
            />
            <img
              src={dummyData.propertyImage[2]}
              alt="Thumbnail 2"
              className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              onClick={() => changeImage(dummyData.propertyImage[2])}
            />
            <img
              src={dummyData.propertyImage[3]}
              alt="Thumbnail 3"
              className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              onClick={() => changeImage(dummyData.propertyImage[3])}
            />
            <img
              src={dummyData.propertyImage[4]}
              alt="Thumbnail 4"
              className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              onClick={() => changeImage(dummyData.propertyImage[4])}
            />
          </div>
        </div>

        {/* <!-- Product Details --> */}
        <div class="w-full md:w-1/2 px-4">
          <h2 class="text-3xl font-bold mb-2">{dummyData.address}</h2>
          <p class="text-gray-600 mb-4">{dummyData.city}, {dummyData.province}, {dummyData.postal_code}</p>
          <div class="mb-4">
            {/* Ini aku ambil dari yg bid terbesar currently! */}
            <span class="text-3xl font-bold mr-2 animate-pulse">{dummyData.user[0].bid} ICP</span>
            <span class="text-gray-500">from {dummyData.startingBid} ICP</span>
          </div>

          <div class="flex flex-row gap-2">
            <div class="flex flex-row gap-1.5">
              <img class="w-6" src="https://img.icons8.com/material-sharp/24/calendar--v1.png" alt="calendar--v1" />
              <p class="text-md font-medium text-gray-500 ">{dummyData.startBid_date}</p>
            </div>
            <div class="flex flex-row gap-1.5">
              <img class="w-6" src="https://img.icons8.com/ios/50/arrow--v1.png" alt="arrow--v1" />
              <p class="text-md font-medium text-red-500 ">{dummyData.endBid_date}</p>
            </div>
          </div>
          <p class="text-gray-700 my-6">{dummyData.description}</p>

          {/* Untuk timernya ini, bisa ganti endBid_date dan endBid_hour nya yaa, 
          Aku BELUM bikin logic semisal countdownnya selesai gimana */}

          <div class="mb-6 flex items-center justify-center md:justify-start w-full gap-4 count-down-main">
            <div class="timer w-16">
              <div
                class=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                <h3
                  class="countdown-element days font-Cormorant font-semibold text-2xl text-white text-center">
                </h3>
              </div>
              <p class="text-lg font-Cormorant font-medium text-gray-900 mt-1 text-center w-full">days</p>
            </div>
            <div class="timer w-16">
              <div
                class=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                <h3
                  class="countdown-element hours font-Cormorant font-semibold text-2xl text-white text-center">
                </h3>
              </div>
              <p class="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">hours</p>
            </div>
            <div class="timer w-16">
              <div
                class=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden">
                <h3
                  class="countdown-element minutes font-Cormorant font-semibold text-2xl text-white text-center">
                </h3>
              </div>
              <p class="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">minutes</p>
            </div>
            <div class="timer w-16">
              <div
                class=" bg-amber-700 py-4 px-2 rounded-lg overflow-hidden ">
                <h3
                  class="countdown-element seconds font-Cormorant font-semibold text-2xl text-white text-center animate-countinsecond">
                </h3>
              </div>
              <p class="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">seconds</p>
            </div>
          </div>


          <div class="flex space-x-4 mb-6">
            <button
              class="bg-amber-900 flex gap-2 items-center text-white px-6 py-4 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <img class="w-8" src="\images\bidding.png" alt="arrow--v1" />
              <p class="text-xl">Bid Now!</p>
            </button>

          </div>


        </div>
      </div>
    </div>
  )
}

export default AuctionDetail