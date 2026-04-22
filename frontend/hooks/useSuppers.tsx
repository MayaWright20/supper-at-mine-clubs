import axios from "axios";
import { useCallback, useEffect } from "react";

import { StoreState, useStore } from "@/store/store";
import { Supper } from "@/types/types";

import useProfile from "./useProfile";
import useSession from "./useSession";

export default function useSuppers() {
  const { sessionToken } = useSession();
  const { user } = useProfile();
  const userId = user?._id;
  const suppers = useStore((state: StoreState) => state.suppers);
  const setSuppers = useStore((state: StoreState) => state.setSuppers);

  const createSupper = async ({
    name,
    description,
    imageUris = []
  }: Supper) => {
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("availableSeats", "5");
    data.append("price", "40");

    imageUris.forEach((uri, index) => {
      data.append("images", {
        uri,
        name: `supper-image-${index + 1}.jpg`,
        type: "image/jpeg"
      } as any);
    });

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_URL}/suppers`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );

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
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_URL}/suppers`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
      );

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

  const mySuppers = suppers
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
