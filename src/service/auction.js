import { Principal } from "@dfinity/principal";
import { getActorWithLogin, getActorWithoutLogin } from "./connector";

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
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getAllAuctions() {
    return await loadAllAuctions();
}

export async function loadAllAuctions() {
    try {
        const actor = getActorWithoutLogin();
        const data = await actor.getAuctionList();
        return structuredAuctions(data);
    }
    catch(error) {
        console.log(error)
        return;
    }
}

export async function structuredAuctions(data) {
    const auctionList = data.map((auction) => ({
        
    }))
}