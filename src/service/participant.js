/* eslint-disable no-unused-vars */
import { getActorWithLogin, getActorWithoutLogin } from "./connector";

export async function bidAuction(auctionId, bidAmount) {
  try {
    const actor = await getActorWithLogin();
    await actor.bidAuction(auctionId, bidAmount);
  } catch (error) {
    console.log(error);
  }
}

export async function checkParticipantVerification() {
  try {
    const actor = await getActorWithLogin();
    await actor.checkParticipantVerification();
  } catch (error) {
    console.log(error);
  }
}

export async function addVerifiedUser(verificationHash) {
  try {
    const actor = await getActorWithLogin();

    const verificationMessage = await actor.checkParticipantVerification();

    if (verificationMessage == "Verification hash not found!") {
      await actor.addVerifiedUser(verificationHash);
      console.log("User verified and added successfully.");
    } else {
      console.log("User already verified with hash:", verificationMessage);
    }
  } catch (error) {
    const actor = await getActorWithLogin();
    console.log("No verification hash found, proceeding to add user.");
    await actor.addVerifiedUser(verificationHash);
  }
}

export async function getAllParticipants() {
  return await loadAllParticipants();
}

async function loadAllParticipants() {
  try {
    const actor = await getActorWithoutLogin();
    const data = await actor.getAllParticipants();
    return structuredParticipants(data) || [];
  } catch (error) {
    console.log(error);
    return [];
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