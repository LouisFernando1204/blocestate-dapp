import { getActorWithLogin, getActorWithoutLogin } from "./connector";

export async function bidAuction(auctionId, bidAmount) {
  try {
    const actor = await getActorWithLogin();
    await actor.bidAuction(auctionId, bidAmount);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllParticipants() {
  return await loadAllParticipants();
}

export async function getAuctionParticipants(address) {
  return await loadAuctionParticipants(address);
}

async function loadAllParticipants() {
  try {
    const actor = await getActorWithoutLogin();
    const data = await actor.getAllParticipants();
    return structuredParticipants(data) || [];
  } catch (error) {
    console.log(error);
    return;
  }
}

async function loadAuctionParticipants(address) {
  try {
    const actor = await getActorWithoutLogin();
    const data = await actor.getAuctionParticipants(address);
    return data.map((principal) => principal.toString()) || []
  }
  catch(error) {
    console.log(error)
    return;
  }
}

function structuredParticipants(data) {
  const participantList = data.map((participant) => ({
    id: parseInt(participant.id),
    user: participant.user.toString(),
    amount: parseInt(participant.amount),
    auctionId: parseInt(participant.auctionId)
  }));
  return participantList;
}