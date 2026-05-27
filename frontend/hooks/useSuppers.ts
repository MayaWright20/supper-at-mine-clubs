import { useCallback, useEffect } from "react";

import { suppersApi } from "@/api/suppers";
import { StoreState, usePersistStore, useStore } from "@/store/store";
import type { components } from "@/types/types";

import useSession from "./useSession";

type Supper = components["schemas"]["Supper"];
type SupperWithCreatedBy = Omit<Supper, "createdBy"> & {
  createdBy: string | { _id?: string };
};

export default function useSuppers() {
  const { sessionToken } = useSession();
  const userId = usePersistStore((state: any) => state.user?._id);

  const suppers = useStore((state: StoreState) => state.suppers) as
    | SupperWithCreatedBy[]
    | undefined;
  const setSuppers = useStore((state: StoreState) => state.setSuppers);

  const setHasFetchedSuppers = useStore(
    (state: StoreState) => state.setHasFetchedSuppers
  );

  const setIsFetchingSuppers = useStore(
    (state: StoreState) => state.setIsFetchingSuppers
  );

  const createSupper = async ({
    name,
    description,
    images = [],
    price
  }: Supper) => {
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("availableSeats", "5");
    data.append("price", String(price));

    images.forEach((uri, index) => {
      data.append("images", {
        uri,
        name: `supper-image-${index + 1}.jpg`,
        type: "image/jpeg"
      } as any);
    });

    try {
      const response = await suppersApi.create(data, sessionToken);

      if (response.data.success) {
        await getAllSuppers({ force: true });
        return response.data.supper;
      }
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || err.message || "Unable to create supper"
      );
    }
  };

  const getAllSuppers = useCallback(
    async ({ force = false }: { force?: boolean } = {}) => {
      const { isFetchingSuppers, hasFetchedSuppers } = useStore.getState();

      if (!sessionToken || isFetchingSuppers || (!force && hasFetchedSuppers)) {
        return;
      }

      setIsFetchingSuppers(true);

      try {
        const response = await suppersApi.getAll(sessionToken);

        if (response.data.success) {
          setSuppers(response.data.allSuppers);
          setHasFetchedSuppers(true);
        }
      } catch (err: any) {
        console.log("Unsuccessful get", err.message);
      } finally {
        setIsFetchingSuppers(false);
      }
    },
    [sessionToken, setSuppers, setHasFetchedSuppers, setIsFetchingSuppers]
  );

  useEffect(() => {
    getAllSuppers();
  }, [getAllSuppers]);

  const mySuppers: SupperWithCreatedBy[] = suppers
    ? suppers.filter((item) => {
        const createdById =
          typeof item.createdBy === "string"
            ? item.createdBy
            : item.createdBy?._id;

        return createdById === userId;
      })
    : [];

  return {
    createSupper,
    getAllSuppers,
    suppers,
    setSuppers,
    mySuppers
  };
}
