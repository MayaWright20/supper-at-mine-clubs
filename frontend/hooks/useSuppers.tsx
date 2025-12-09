import axios from "axios";
import { useCallback, useEffect } from "react";

import { StoreState, useStore } from "@/store/store";
import { Supper } from "@/types/types";

import useSession from "./useSession";

export default function useSupper() {
  const { sessionToken } = useSession();
  const suppers = useStore((state: StoreState) => state.suppers);
  const setSuppers = useStore((state: StoreState) => state.setSuppers);

  const createSupper = async ({ name, description }: Supper) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_URL}/suppers`,
        {
          name,
          description,
          availableSeats: 5,
          price: 40,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (response.data.success) {
        getAllSuppers();
      }
    } catch (err: any) {
      console.log("Unsuccessful creation", err.message);
    }
  };

  const getAllSuppers = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_URL}/suppers`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
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

  return {
    createSupper,
    getAllSuppers,
    suppers,
    setSuppers,
  };
}
