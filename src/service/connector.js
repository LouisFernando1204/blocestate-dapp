import { idlFactory } from "../idl/service.did";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

const nnsCanisterId = "o2w3q-vaaaa-aaaag-atsda-cai";
const host = "https://ic0.app";
let identity;

export async function connectInternetIdentity() {
  const authClient = await AuthClient.create();
  const iiUrl = "https://identity.ic0.app";
  await new Promise((resolve, object) => {
    authClient.login({
      identityProvider: iiUrl,
      onSuccess: resolve,
      onError: object
    })
  })
  identity = authClient.getIdentity();
  console.log(identity.getPrincipal().toText());
}

export function getCurrentIdentity() {
  return identity.getPrincipal().toText();
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
  if (identity) {
    const agent = new HttpAgent({ identity, host: host });
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: nnsCanisterId,
    });
    return actor;
  }
}