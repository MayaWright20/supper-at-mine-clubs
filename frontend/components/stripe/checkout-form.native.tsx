import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { suppersApi } from "@/api/suppers";
import useProfile from "@/hooks/useProfile";
import useSession from "@/hooks/useSession";
import { useStore } from "@/store/store";

import CTA from "../buttons/cta";

async function fetchPaymentSheetParams(amount: number): Promise<{
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}> {
  return fetch(`/api/payment-sheet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount })
  }).then((res) => res.json());
}

export default function CheckoutForm({
  supperId,
  seats,
  amount,
  isDisabled
}: {
  supperId: string;
  seats: number;
  amount: number;
  isDisabled: boolean;
}) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { sessionToken } = useSession();
  const { getProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const setSuppers = useStore((state) => state.setSuppers);
  const currentSuppers = useStore.getState().suppers;

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(amount);

    // Use Mock payment data: https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-test
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Expo, Inc.",

      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
        email: "jenny.rosen@example.com",
        phone: "888-888-8888"
      },
      returnURL: Linking.createURL("stripe-redirect"),

      // Enable Apple Pay:
      // https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#add-apple-pay
      applePay: {
        merchantCountryCode: "GB"
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      try {
        const response = await suppersApi.updateSupper(
          supperId,
          seats,
          sessionToken
        );

        if (response.status === 200) {
          router.navigate(`/(app)/my-suppers`);
          await getProfile(sessionToken);
          if (currentSuppers) {
            const updatedSuppers = currentSuppers.map((s: any) =>
              s._id === supperId ? response.data.supper : s
            );
            setSuppers(updatedSuppers);
          }
        }
      } catch (e: any) {
        console.error("Booking failed after payment:", e);
        Alert.alert(
          "Booking failed",
          e.response?.data?.message ||
            "Your payment was successful but we couldn't complete your booking. Please contact support."
        );
      }
      // Alert.alert("Success", "Your order is confirmed!");

      // SEND TO SUCCESS SCREEN
    }
  };

  useEffect(() => {
    if (isDisabled) return;
    initializePaymentSheet();
  }, [isDisabled]);

  return (
    <CTA
      isDisabled={isDisabled}
      variant="default"
      title={"Pay"}
      onPress={openPaymentSheet}
    />
  );
}
