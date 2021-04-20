import React, { useEffect } from 'react';
import { Layout } from '@ui-kitten/components';
import CategoriesList from '../components/CategoriesList';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  
  useEffect(()=> {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php').then(res => setCategories(res.data.categories));
  },[])

  return (
  // <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <CategoriesList categories={categories}/>
  // </Layout>
  );
}

export default Categories;