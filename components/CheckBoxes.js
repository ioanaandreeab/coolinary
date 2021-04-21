import React from 'react';
import {StyleSheet } from 'react-native';
import  {CheckBox } from '@ui-kitten/components';
    
const IngredientCheckBox = (props) => {

  const [checked, setChecked] = React.useState(false);

  return (
    <CheckBox
      style={styles.checkBox}
      checked={checked}
      onChange={nextChecked => setChecked(nextChecked)}>{props.ingredient}</CheckBox>
  );
}
const styles = StyleSheet.create({
  checkBox: {
    marginTop: 5
  }
});
export default IngredientCheckBox;