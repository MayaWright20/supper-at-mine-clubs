import { useCallback, useEffect } from "react";

import { suppersApi } from "@/api/suppers";
import { StoreState, useStore } from "@/store/store";
import type { components } from "@/types/types";

import useProfile from "./useProfile";
import useSession from "./useSession";

type Supper = components["schemas"]["Supper"];
type SupperWithCreatedBy = Omit<Supper, "createdBy"> & {
  createdBy: string | { _id?: string };
};

export default function useSuppers() {
  const { sessionToken } = useSession();
  const { user } = useProfile();
  const userId = user?._id;
  const suppers = useStore((state: StoreState) => state.suppers) as
    | SupperWithCreatedBy[]
    | undefined;
  const setSuppers = useStore((state: StoreState) => state.setSuppers);

  const createSupper = async ({ name, description, images = [] }: Supper) => {
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("availableSeats", "5");
    data.append("price", "40");

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
        await getAllSuppers();
        return response.data.supper;
      }
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || err.message || "Unable to create supper"
      );
    }
  };

  const getAllSuppers = useCallback(async () => {
    try {
      const response = await suppersApi.getAll(sessionToken);

      if (response.data.success) {
        setSuppers(response.data.allSuppers);
      }
    } catch (err: any) {
      console.log("Unsuccessful geyt", err.message);
    }
  }, [sessionToken, setSuppers]);

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
