import * as React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { HomeStack } from './StackNavigators'
import { Icon } from '@rneui/base'
import { colors } from '../global/styles'
import Settings from '../screens/drawerScreens/Settings'
import About from '../screens/drawerScreens/About'
import History from '../screens/drawerScreens/History'
import Discounts from '../screens/drawerScreens/Discounts'
import Orders from '../screens/drawerScreens/Orders'
import Support from '../screens/drawerScreens/Support'
import CustomDrawer from "./CustomDrawer";

const DummyScreen = (props) => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{props.name}</Text>
    </View>
  )

const Drawer = createDrawerNavigator()

export default function createNativeStacknavigator(){
    
    return (
        <Drawer.Navigator drawerContent={
            (props) => (
              <CustomDrawer {...props} />)
          }>
            <Drawer.Screen 
                name = 'HomeStack'
                component = {HomeStack}
                options = {{
                    title: 'Home',
                    drawerIcon: ({focussed,size})=> 
                    <Icon type = 'material-community'
                        name = 'home'
                        color = {focussed?'#7cc':colors.grey2}
                        size = {size}                                   
                    />,
                    headerShown : false
                }}
            />
            <Drawer.Screen 
                name = 'Orders'
                component = {Orders}
                options = {{
                    title: 'Orders',
                    drawerIcon: ({focussed,size})=> 
                    <Icon type = 'material-community'
                        name = 'home'
                        color = {focussed?'#7cc':colors.grey2}
                        size = {size}                                   
                    />,
                    headerShown : true
                }}
            />
            <Drawer.Screen 
                name = 'History'
                component = {History}
                options = {{
                    title: 'History',
                    drawerIcon: ({focussed,size})=> 
                    <Icon type = 'material-community'
                        name = 'home'
                        color = {focussed?'#7cc':colors.grey2}
                        size = {size}                                   
                    />,
                    headerShown : true
                }}
            />
            <Drawer.Screen 
                name = 'Discounts'
                component = {Discounts}
                options = {{
                    title: 'Discounts',
                    drawerIcon: ({focussed,size})=> 
                    <Icon type = 'material-community'
                        name = 'home'
                        color = {focussed?'#7cc':colors.grey2}
                        size = {size}                                   
                    />,
                    headerShown : true
                }}
            />
            <Drawer.Screen 
                name = 'Support'
                component = {Support}
                options = {{
                    title: 'Support',
                    drawerIcon: ({focussed,size})=> 
                    <Icon type = 'material-community'
                        name = 'home'
                        color = {focussed?'#7cc':colors.grey2}
                        size = {size}                                   
                    />,
                    headerShown : true
                }}
            />
            <Drawer.Screen 
                name = 'Settings'
                component = {Settings}
                options = {{
                    title: 'Settings',
                    drawerIcon: ({focussed,size})=> 
                    <Icon type = 'material-community'
                        name = 'home'
                        color = {focussed?'#7cc':colors.grey2}
                        size = {size}                                   
                    />,
                    headerShown : true
                }}
            />
            
        </Drawer.Navigator>
    )
}