import React, {useContext} from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { Icon } from '@rneui/base'
import { colors } from '../global/styles'
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";


const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#FF8C00', padding: 15}}>

        {/* User Row */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#cacaca',
            width: 50,
            height: 55,
            borderRadius: 50,
            marginRight: 10,
          }}/>

          <View>
            <Text style={{color: 'white', fontSize: 24}}>Van Vince</Text>
            <Text style={{color: 'white'}}>5.00*</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View style={{
          // borderBottomWidth: 1,
          // borderBottomColor: 'white',
          // borderTopWidth: 1,
          borderTopColor: 'white',
          paddingVertical: 5,
          marginVertical: 5,
        }}>
          <Pressable
            onPress={() => {console.warn('Messages')}}>
            <Text style={{color: '#dddddd', paddingVertical: 10,}}>Notification</Text>
          </Pressable>
        </View>
      </View>

      <DrawerItemList {...props} />

   
      <TouchableOpacity onPress={async = () => signOut(auth)} 
        style={{flexDirection: 'row', marginLeft:20, marginTop:10, alignItems:'center'}}>
        <Icon 
          type = 'material-community'
          name = 'home'
          color = {colors.grey2}                                 
        />
        <Text style={{padding: 5, paddingLeft: 30, fontWeight:'bold', color:colors.grey2}}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;