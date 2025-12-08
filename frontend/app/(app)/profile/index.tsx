import CTA from '@/components/buttons/cta';
import useProfile from '@/hooks/useProfile';
import useSession from '@/hooks/useSession';
import useSupper from '@/hooks/useSuppers';
import axios from 'axios';
import { Text, View } from 'react-native';

export default function Index() {
  const { logOut, user } = useProfile();
  const { createSupper } = useSupper();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CTA title={'Create Supper Club'} onPress={createSupper} />
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
