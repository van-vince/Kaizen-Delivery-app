import React, {useContext} from "react";
import { View, Text, Pressable, TouchableOpacity, ImageBackground } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { Icon, Image } from '@rneui/base'
import { colors } from '../global/styles'
import { AuthContext} from "../context/contexts"
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Share } from "react-native";

const CustomDrawer = props => {

  const {logout} = useContext(AuthContext)
  const {userInfo} = useContext(AuthContext)
  const customer = userInfo?.customer;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.vanvince.kaizen',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#FF8C00'}}>
        <ImageBackground
          source={require('../../assets/image-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={{uri: `${customer.image}` }}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {userInfo?.customer.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              Earn Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
            <Text style={{color: 'white', marginLeft:10}}>*5.00</Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
            onPress={onShare}
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;







// const CustomDrawer = (props) => {

//   const {logout} = useContext(AuthContext)
//   const {userInfo} = useContext(AuthContext)

//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={{backgroundColor: '#FF8C00', padding: 15}}>

//         {/* User Row */}
//         <View style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//           <View style={{
//             backgroundColor: '#cacaca',
//             width: 50,
//             height: 55,
//             borderRadius: 50,
//             marginRight: 10,
//           }}/>

//           <View>
//             <Text style={{color: 'white', fontSize: 24}}>{userInfo?.customer.name}</Text>
//             <Text style={{color: 'white'}}>5.00*</Text>
//           </View>
//         </View>

//         {/* Messages Row */}
//         <View style={{
//           // borderBottomWidth: 1,
//           // borderBottomColor: 'white',
//           // borderTopWidth: 1,
//           borderTopColor: 'white',
//           paddingVertical: 5,
//           marginVertical: 5,
//         }}>
//           <Pressable
//             onPress={() => {console.warn('Messages')}}>
//             <Text style={{color: '#dddddd', paddingVertical: 10,}}>Notification</Text>
//           </Pressable>
//         </View>
//       </View>

//       <DrawerItemList {...props} />

   
//       <TouchableOpacity onPress={logout} 
//         style={{flexDirection: 'row', marginLeft:20, marginTop:10, alignItems:'center'}}>
//         <Icon 
//           type = 'material-community'
//           name = 'home'
//           color = {colors.grey2}                                 
//         />
//         <Text style={{padding: 5, paddingLeft: 30, fontWeight:'bold', color:colors.grey2}}>Logout</Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// };

// export default CustomDrawer;