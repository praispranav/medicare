const RINGBA_COM_TAGS = [
  { key: "JSbfbe6e3aef084885af8a574bec4f8d45", user: "user1" },
];

export const activeUser = "user1";

export function useRingbaUser() {
  const activeUserKeyObj = RINGBA_COM_TAGS.find((i) => i.user === activeUser);
  if (activeUserKeyObj) return activeUserKeyObj.key;
  else return "";
}
