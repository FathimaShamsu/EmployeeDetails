import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image, View} from 'react-native';

const EmployeeDetails = ({route}) => {
  const largeIcon = route.params.item.profile_image;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        {largeIcon !== null ? (
          <Image source={{uri: largeIcon}} style={styles.imageStyle} />
        ) : (
          <Image
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            style={styles.imageStyle}
          />
        )}
        <View style={styles.title}>
          <Text style={styles.employeeNameStyle}>
            Name: {route.params.item.name}
          </Text>
          <Text style={styles.employeeNameStyle}>
            Username:{route.params.item.username}
          </Text>
          <Text style={styles.employeeNameStyle}>
            Email: {route.params.item.email}
          </Text>
          <Text style={styles.employeeNameStyle}>
            phone: {route.params.item.phone}
          </Text>
          <Text style={styles.employeeNameStyle}>
            website: {route.params.item.website}
          </Text>
          {route.params.item.company !== null ? (
            <View>
              <Text style={styles.employeeNameStyle}>
                Company Name: {route.params.item.company.name}
              </Text>
              <Text style={styles.employeeNameStyle}>
                Company catchPhras: {route.params.item.company.catchPhras}
              </Text>
              <Text style={styles.employeeNameStyle}>
                Company bs: {route.params.item.company.bs}
              </Text>
            </View>
          ) : null}
          {route.params.item.address !== null ? (
            <View>
              <Text style={styles.employeeNameStyle}>
                Address:
                {`${route.params.item.address.city} , ${route.params.item.address.street},${route.params.item.address.suite},${route.params.item.address.zipcode}`}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  imageStyle: {
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    width: '45%',
    height: '35%',
    justifyContent: 'center',
    borderRadius: 80,
  },
  employeeNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  title: {
    alignItems: 'flex-start',
    marginLeft: 50,
    padding: 20,
  },
  viewStyle: {
    alignItems: 'center',
    paddingTop: 50,
  },
});
export default EmployeeDetails;
