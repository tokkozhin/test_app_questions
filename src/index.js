import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from 'src/navigation';
import {Provider} from 'src/store';

export default () => (
  <Provider>
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  </Provider>
);
