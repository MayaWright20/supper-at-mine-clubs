import { usePersistStore } from "@/store/store";

export default function useSession() {
  const sessionToken = usePersistStore((state: any) => state.sessionToken);
  const setSessionToken = usePersistStore(
    (state: any) => state.setSessionToken
  );

  return {
    sessionToken,
    setSessionToken,
  };
}
