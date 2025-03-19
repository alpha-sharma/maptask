import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {height, width} = useWindowDimensions();
  const image = {uri: '../../asset/login.png'};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
        <ImageBackground
          source={require('../../asset/login.png')}
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'center'}}>
          <Image style={{resizeMode:'contain',alignSelf:'center',width:width-150,height:200,marginBottom:50}} source={require('../../asset/backpreview.png')} />
          <View
            style={{
              marginHorizontal: 15,
              borderRadius: 10,
              paddingVertical: 15,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                paddingLeft: 20,
                alignSelf: 'flex-start',
                color: 'grey',
                paddingBottom:5,
                fontSize: 15,
              }}>
              Email Id
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: width - 70,
                marginBottom: 15,
              }}
              onChangeText={text => setUserName(text)}
              value={userName}
              placeholder="Enter Your Email id"
            />
            <Text
              style={{
                paddingLeft: 20,
                alignSelf: 'flex-start',
                color: 'grey',
                paddingBottom:5,
                fontSize: 15,
              }}>
              Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: width - 70,
                marginBottom: 25,
              }}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Enter your Password"
            />

            <TouchableOpacity
              style={{
                backgroundColor: '#76A488',
                borderWidth: 1,
                borderRadius: 5,
                width: width - 70,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}
              onPress={() => navigation.navigate('MapScreen')}>
              <Text>Login</Text>
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                color: '#76A488',
                fontSize: 15,
              }}>
              SignUp?
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
