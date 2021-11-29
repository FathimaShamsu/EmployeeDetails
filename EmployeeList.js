import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  FlatList,
  View,
  Pressable,
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EmployeeList = ({navigation}) => {
  const [filterData, setfilter] = useState([]);
  const [data, setData] = useState([]);
  const [searchItem, setsearchItem] = useState([]);


  useEffect(() => {
    fetch('http://www.mocky.io/v2/5d565297300000680030a986')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setfilter(json);
        AsyncStorage.setItem('EmployeeList', json);
      })
      .catch(error => console.error(error));
  }, []);


  const searchFilterFunction = text => {
    const newData = filterData.filter(item => {
      const itemNameData = `${
        item.name !== '' && item.name !== null && item.name !== undefined
          ? item.name.toUpperCase()
          : ''
      }`;
      const itemEmailSet = `${
        item.email !== '' && item.email !== null && item.email !== undefined
          ? item.email.toUpperCase()
          : ''
      }`;
      const textData =
        text !== '' && text !== undefined && text !== null
          ? text.toUpperCase()
          : '';
      if (itemNameData.indexOf(textData) > -1) {
        return itemNameData.indexOf(textData) > -1;
      } else {
        return itemEmailSet.indexOf(textData) > -1;
      }
    });
    setsearchItem(text);
    setData(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search employee"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.searchInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}
        value={searchItem}
        clearIcon
        onClear={() => {}}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const largeIcon = item.profile_image;
          return (
            <Pressable
              style={styles.cardView}
              onPress={() => {
                navigation.navigate('EmployeeDetails', {item: item});
              }}>
              {largeIcon !== null ? (
                <Image source={{uri: largeIcon}} style={styles.imageStyle} />
              ) : (
                <Image
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                  style={styles.imageStyle}
                />
              )}
              <View style={styles.title}>
                <Text style={styles.employeeNameStyle}>{item.name}</Text>
                {item.company !== null ? (
                  <Text style={styles.employeeNameStyle}>
                    {item.company.name}
                  </Text>
                ) : (
                  <Text style={styles.employeeNameStyle}>{''}</Text>
                )}
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  containerStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
  inputContainerStyle: {
    backgroundColor: '#D7E2E9',
    borderRadius: 20,
    height: '7%',
  },
  imageStyle: {
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
  employeeNameStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  cardView: {
    flexDirection: 'row',
    padding: '2%',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: '2%',
  },
  title: {
    flex: 1,
    paddingLeft: '2.3%',
    justifyContent: 'center',
  },
});
export default EmployeeList;
