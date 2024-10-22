export const idlFactory = ({ IDL }) => {
    const UserPrincipal = IDL.Record({
      username: IDL.Text,
      princi: IDL.Principal,
      wallet: IDL.Principal,
    });
    return IDL.Service({
      addUserPrincipal: IDL.Func([IDL.Text, IDL.Principal], [], []),
      getUserPrincipalArray: IDL.Func([], [IDL.Vec(UserPrincipal)], ["query"]),
    });
  };
  export const init = ({ IDL }) => {
    return [];
  };