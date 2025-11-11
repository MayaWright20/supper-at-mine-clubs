import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CTA from '@/components/buttons/cta';
import TextInputComponent from '@/components/inputs/text-input';

import { COLORS } from '@/costants/colors';
import { AUTH_FORM, StoreState, useStore } from '@/store/store';
import { AuthRoutes, ErrorStateValue } from '@/types';

// import { useSession } from '../ctx';

export default function SignIn() {
  //   const { signIn } = useSession();
  const isLogin = useStore((state: StoreState) => state.authCTATitle);
  const setAuthCTATitle = useStore((state: StoreState) => state.setAuthCTATitle);
  const setIsAuthBgCol = useStore((state: StoreState) => state.setIsAuthBgCol);
  const authForm = useStore((state: StoreState) => state.authForm);
  const setAuthForm = useStore((state: StoreState) => state.setAuthForm);

  const resetForm = () => {
    const updatedForm = authForm.map((field) => {
      return {
        ...field,
        value: '',
        showErrorMessage: false,
      };
    });
    setAuthForm(updatedForm);
  };

  const backCta = () => {
    setAuthCTATitle(AuthRoutes.SING_UP);
    setIsAuthBgCol(false);
    resetForm();
    router.navigate('/');
  };

  const updateFormHandler = (item: ErrorStateValue, value: string) => {
    const updatedForm = authForm.map((field) => {
      if (field.id === item.id) {
        return {
          ...field,
          value: value,
          showErrorMessage: false,
        };
      }
      return field;
    });
    setAuthForm(updatedForm);
  };

  useEffect(() => {
    setIsAuthBgCol(true);
  }, [setAuthCTATitle, setIsAuthBgCol]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CTA isSmall style={styles.backCTA} title={'Back'} onPress={backCta} />
      <View style={styles.form}>
        {AUTH_FORM &&
          AUTH_FORM.map((item, index) => {
            const formField = authForm.find((field) => field.id === item.id);

            if (isLogin === AuthRoutes.LOGIN && (item.id === 'name' || item.id === 'email')) return;

            return (
              <TextInputComponent
                autoCapitalize={item.autoCapitalize}
                value={formField?.value || ''}
                onChangeText={(value) => {
                  updateFormHandler(item, value);
                }}
                key={index}
                color={COLORS.RED_0}
                backgroundColor={COLORS.PINK_0}
                label={
                  isLogin === AuthRoutes.LOGIN && item.id === 'username'
                    ? 'Username | Email'
                    : item.label
                }
                secureTextEntry={item.secureTextEntry}
                errorMessage={formField?.errorMessage}
                showErrorMessage={formField?.showErrorMessage}
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.CREAM_0,
  },
  backCTA: {
    alignSelf: 'flex-start',
  },
  form: {
    flex: 1,
    marginTop: 20,
  },
});
