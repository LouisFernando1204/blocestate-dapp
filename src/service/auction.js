import { Principal } from "@dfinity/principal";
import { getActorWithLogin, getActorWithoutLogin } from "./connector";

export async function decideFinalBid(
  participant,
  address,
  finalPrice,
  auctionId
) {
  try {
    const actor = await getActorWithLogin();
    await actor.decideFinalBid(
      Principal.fromText(participant),
      address,
      finalPrice,
      auctionId
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createAuction(
  image,
  address,
  province,
  city,
  postalCode,
  propertyType,
  houseArea,
  yearBuilt,
  description,
  startPrice,
  startAuction,
  endAuction,
  certificateNumber,
  certificate
) {
  try {
    const actor = await getActorWithLogin();
    await actor.createAuction(
      image,
      address,
      province,
      city,
      postalCode,
      propertyType,
      houseArea,
      yearBuilt,
      description,
      startPrice,
      startAuction,
      endAuction,
      certificateNumber,
      certificate
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAuctions() {
  return await loadAllAuctions();
}

export async function getFinalBids() {
  return await loadAllFinalBids();
}

async function loadAllAuctions() {
  try {
    const actor = await getActorWithoutLogin();
    const data = await actor.getAuctionList();
    return structuredAuctions(data) || [];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function loadAllFinalBids() {
  try {
    const actor = await getActorWithoutLogin();
    const data = await actor.getFinalBids();
    return structuredFinalBids(data) || [];
  }
  catch(error) {
    console.log(error);
    return [];
  }
}

function structuredAuctions(data) {
  const auctionList = data.map((auction) => ({
    id: parseInt(auction.id),
    creator: auction.creator.toString(),
    certificate: auction.certificate.toString(),
    province: auction.province.toString(),
    propertyType: auction.propertyType.toString(),
    city: auction.city.toString(),
    postalCode: parseInt(auction.postalCode),
    startAuction: parseInt(auction.startAuction),
    description: auction.description.toString(),
    endAuction: parseInt(auction.endAuction),
    address: auction.address.toString(),
    image: auction.image.toString(),
    houseArea: parseInt(auction.houseArea),
    startPrice: parseInt(auction.startPrice),
    certificateNumber: parseInt(auction.certificateNumber),
    yearBuilt: parseInt(auction.yearBuilt),
  }));
  return auctionList;
}

function structuredFinalBids(data) {
  const finalBidList = data.map((finalBid) => ({
    id: parseInt(finalBid.id),
    finalPrice: parseInt(finalBid.finalPrice),
    auctionId: parseInt(finalBid.auctionId),
    user: finalBid.user.toString(),
  }));
  return finalBidList;
}
