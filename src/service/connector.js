import { idlFactory } from "../idl/service.did";
import { Actor, HttpAgent } from "@dfinity/agent";

const nnsCanisterId = "pgty3-qqaaa-aaaao-a3ubq-cai";
const host = "https://ic0.app";

export async function connectWallet() {
  const whitelist = [nnsCanisterId];
  try {
    await window?.ic?.plug?.requestConnect({
      whitelist,
    });
    return window.ic.plug.principalId;
  } 
  catch (error) {
    console.log(error);
    return;
  }
}

export async function getActorWithoutLogin() {
  const agent = new HttpAgent({ host: host });
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: nnsCanisterId,
  });
  return actor;
}

export async function getActorWithLogin() {
  const publicKey = await window.ic.plug.agent.getPrincipal();
  if (publicKey) {
    const agent = new HttpAgent({ publicKey, host: host });
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: nnsCanisterId,
    });
    return actor;
  }
}
