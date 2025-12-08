import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CTA from '@/components/buttons/cta';
import AnimatedTextInput from '@/components/inputs/text-input';

import { COLORS } from '@/constants/colors';
import { StoreState, useStore } from '@/store/store';
import { AuthRoutes } from '@/types';
import { AUTH_FORM } from '@/utils/auth';

export default function SignIn() {
  const isLogin = useStore((state: StoreState) => state.authCTATitle);
  const setAuthCTATitle = useStore((state: StoreState) => state.setAuthCTATitle);
  const setIsAuthBgCol = useStore((state: StoreState) => state.setIsAuthBgCol);
  const authForm = useStore((state: StoreState) => state.authForm);
  const updateAuthFormField = useStore((state: StoreState) => state.updateAuthFormField);
  const resetAuthForm = useStore((state: StoreState) => state.resetAuthForm);

  const backCta = () => {
    setAuthCTATitle(AuthRoutes.SING_UP);
    setIsAuthBgCol(false);
    resetAuthForm();
    router.navigate('/');
  };

  useEffect(() => {
    setIsAuthBgCol(true);
  }, [setIsAuthBgCol]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CTA isSmall style={styles.backCTA} title={'Back'} onPress={backCta} />
      <View style={styles.form}>
        {AUTH_FORM &&
          AUTH_FORM.map((item, index) => {
            const formField = authForm.find((field) => field.id === item.id);

            if (isLogin === AuthRoutes.LOGIN && (item.id === 'name' || item.id === 'email')) return;

            return (
              <AnimatedTextInput
                borderColor={COLORS.RED_0}
                autoCapitalize={item.autoCapitalize}
                value={formField?.value || ''}
                onChangeText={(value) => {
                  updateAuthFormField(item.id, value, false);
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
    marginHorizontal: 5,
  },
});
