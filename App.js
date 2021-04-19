import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import TabNavigator from './navigation/TabNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <TabNavigator />
    </ApplicationProvider>
  </>
);