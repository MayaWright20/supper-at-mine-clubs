import useProfile from '@/hooks/useProfile';
import { Text, View } from 'react-native';

export default function Index() {
  const { logOut, user } = useProfile();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user.name}</Text>
      <Text
        onPress={() => {
          logOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
