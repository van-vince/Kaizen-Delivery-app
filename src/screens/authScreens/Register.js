import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import InputField from '../../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CuctomButton';
import { parameters } from '../../global/styles';
import { AuthContext } from '../../context/contexts';

const Register = ({navigation}) => {

  const {register} = useContext(AuthContext)

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [contact, setContact] = useState(null)
  const [password, setPassword] = useState(null)


  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center',  paddingTop: 150}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          Register
        </Text>
        <InputField
          label={'Username'}
          value={name}
          onChangeText={text => setName(text)}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <InputField
          label={'Contact'}
          icon={
            <MaterialIcons
              name="call"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="phone-pad"
          value={contact}
          onChangeText={text => setContact(text)}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <CustomButton label={'Register'} onPress={() => register(name, email, contact, password)} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style = 'light'  backgroundColor = '#FF8C00' translucent = {true}/>
    </SafeAreaView>
  );
};

export default Register;