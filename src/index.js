import React, {useEffect} from 'react';
import {VK_APP_ID} from 'src/core/config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import VKLogin from 'react-native-vkontakte-login';
import Navigator from 'src/navigation';
import {Provider} from 'src/store';

export default () => {
  useEffect(() => {
    VKLogin.initialize(VK_APP_ID);
  });
  return (
    <Provider>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
};
