import React from 'react';
import { Text, Layout } from '@ui-kitten/components';
import Search from '../components/Search';

const Home = () => (
  <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Search/>   
  </Layout>
);

export default Home;