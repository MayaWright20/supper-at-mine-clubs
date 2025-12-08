import axios from 'axios';
import useSession from './useSession';

export default function useSupper() {
  const { sessionToken } = useSession();

  const createSupper = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_URL}/suppers`,
        {
          name: 'test supper 1',
          description: 'test supper description 1',
          availableSeats: 5,
          price: 40,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        },
      );

      if (response.data.success) {
        console.log('This is successful creation');
      }
    } catch (err: any) {
      console.log('Unsuccessful creation', err.message);
    }
  };

  const getAllSupper = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/suppers`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      if (response.data.success) {
        console.log('This is successful get', response.data.allSuppers);
      }
    } catch (err: any) {
      console.log('Unsuccessful geyt', err.message);
    }
  };

  return {
    createSupper,
    getAllSupper,
  };
}
