export const idlFactory = ({ IDL }) => {
  const Participant = IDL.Record({
    id: IDL.Nat,
    auctionId: IDL.Nat,
    user: IDL.Principal,
    amount: IDL.Nat,
  });
  const Auction = IDL.Record({
    id: IDL.Nat,
    creator: IDL.Principal,
    certificate: IDL.Text,
    province: IDL.Text,
    propertyType: IDL.Text,
    city: IDL.Text,
    postalCode: IDL.Nat,
    startAuction: IDL.Nat,
    description: IDL.Text,
    endAuction: IDL.Nat,
    address: IDL.Text,
    image: IDL.Text,
    houseArea: IDL.Nat,
    startPrice: IDL.Nat,
    certificateNumber: IDL.Nat,
    yearBuilt: IDL.Nat,
  });
  const FinalBid = IDL.Record({
    id: IDL.Nat,
    finalPrice: IDL.Nat,
    auctionId: IDL.Nat,
    user: IDL.Principal,
  });
  return IDL.Service({
    addVerifiedUser: IDL.Func([IDL.Text], [], []),
    bidAuction: IDL.Func([IDL.Nat, IDL.Nat], [], []),
    checkParticipantVerification: IDL.Func([], [IDL.Text], []),
    createAuction: IDL.Func(
      [
        IDL.Text,
        IDL.Text,
        IDL.Text,
        IDL.Text,
        IDL.Nat,
        IDL.Text,
        IDL.Nat,
        IDL.Nat,
        IDL.Text,
        IDL.Nat,
        IDL.Nat,
        IDL.Nat,
        IDL.Nat,
        IDL.Text,
      ],
      [],
      []
    ),
    decideFinalBid: IDL.Func(
      [IDL.Principal, IDL.Text, IDL.Nat, IDL.Nat],
      [],
      []
    ),
    getAllParticipants: IDL.Func([], [IDL.Vec(Participant)], ["query"]),
    getAuctionList: IDL.Func([], [IDL.Vec(Auction)], ["query"]),
    getAuctionParticipants: IDL.Func(
      [IDL.Text],
      [IDL.Vec(IDL.Principal)],
      ["query"]
    ),
    getFinalBids: IDL.Func([], [IDL.Vec(FinalBid)], ["query"]),
  });
};
export const init = ({ IDL }) => {
  return [];
};