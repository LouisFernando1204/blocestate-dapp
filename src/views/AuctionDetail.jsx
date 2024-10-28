const AuctionDetail = () => {
  const dummyData = {
    propertyImage: "https://imgcdn.espos.id/@espos/images/2022/10/gacoan.jpg",
    address: "Jl. HR Muhammad No. 25, Pradahkalikendal",
    city: "Surabaya",
    province: "East Java",
    postal_code: "22543",
    description: "PENGEN UDANG KEJU GACOAN YAOLO",
    area: 1250,
    yearBuilt: 2020,
    startBid_date: "2024-05-19",
    endBid_date: "2024-06-01",
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
  
  return (
    <div>AuctionDetail</div>
  )
}

export default AuctionDetail