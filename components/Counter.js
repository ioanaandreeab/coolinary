import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
    
const Counter = ({timesCoocked, isDisabled, handleClick}) => {
    
  return (
      <View style={styles.counterContainer}>
        <Button
            appearance='ghost'
            disabled={isDisabled}
            onPress={()=> handleClick('add')}
            style={styles.roundBtn}
        >+
        </Button>
        <Text category="h6">{timesCoocked}</Text>
        <Button
            appearance='ghost'
            disabled={isDisabled}
            onPress={()=>handleClick('sub')}
            style={styles.roundBtn}
         >-
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
    counterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: '30%'
    },  
    roundBtn: {
        borderRadius: 100,
    }
});

export default Counter;