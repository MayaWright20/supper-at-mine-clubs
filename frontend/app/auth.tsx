import { router } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CTA from '@/components/buttons/cta';
import TextInputComponent, { AutoCapitalize } from '@/components/inputs/text-input';

import { COLORS } from '@/costants/colors';
import { AUTH_FORM, StoreState, useStore } from '@/store/store';
import { AuthRoutes } from '@/types';

// import { useSession } from '../ctx';

interface AuthItem {
  label: string;
  id: string;
  autoCapitalize: AutoCapitalize;
  secureTextEntry?: boolean;
}

type AUTH_ITEM = Record<AuthRoutes.LOGIN | AuthRoutes.SING_UP, AuthItem[]>;

const AUTH_ITEMS: AUTH_ITEM = {
  Login: [
    {
      id: 'username',
      label: 'Username | Email',
      autoCapitalize: AutoCapitalize.none,
    },
    {
      id: 'password',
      label: 'Password',
      autoCapitalize: AutoCapitalize.none,
      secureTextEntry: true,
    },
  ],
  'Sign up': [
    {
      id: 'name',
      label: 'Name',
      autoCapitalize: AutoCapitalize.words,
    },
    {
      id: 'username',
      label: 'Username',
      autoCapitalize: AutoCapitalize.none,
    },
    {
      id: 'email',
      label: 'Email',
      autoCapitalize: AutoCapitalize.none,
    },
    {
      id: 'password',
      label: 'Password',
      autoCapitalize: AutoCapitalize.none,
      secureTextEntry: true,
    },
  ],
};

export default function SignIn() {
  //   const { signIn } = useSession();
  const authCTATitle = useStore((state: StoreState) => state.authCTATitle);
  const setAuthCTATitle = useStore((state: StoreState) => state.setAuthCTATitle);
  const setIsAuthBgCol = useStore((state: StoreState) => state.setIsAuthBgCol);
  const authForm = useStore((state: StoreState) => state.authForm);
  const setAuthForm = useStore((state: StoreState) => state.setAuthForm);

  const formItems = useMemo(() => AUTH_ITEMS[`${authCTATitle}`], [authCTATitle]);

  const backCta = () => {
    setAuthCTATitle(AuthRoutes.SING_UP);
    setIsAuthBgCol(false);
    setAuthForm(AUTH_FORM);
    router.navigate('/');
  };

  useEffect(() => {
    setIsAuthBgCol(true);
  }, [setAuthCTATitle, setIsAuthBgCol]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CTA isSmall style={styles.backCTA} title={'Back'} onPress={backCta} />
      <View style={styles.form}>
        {formItems &&
          formItems.map((item, index) => {
            return (
              <TextInputComponent
                autoCapitalize={item.autoCapitalize}
                onChangeText={(value) =>
                  setAuthForm({
                    ...authForm,
                    [item.id]: value,
                  })
                }
                key={index}
                backgroundColor={COLORS.RED_0}
                label={item.label}
                secureTextEntry={item.secureTextEntry}
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
