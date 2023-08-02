import { StyleSheet, Text, SafeAreaView, View, ScrollView, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {useState, useContext, useEffect, useRef, useMemo, useCallback}from 'react'
import { colors, parameters } from '../global/styles'
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'react-native'



const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const RequestScreen = ({navigation, route}) => {

    const [selectedValue, setSelectedValue] = useState()

  return (
    <ScrollView>
        <View style = {styles.container}>
        <Text style={styles.text1}> Order Details</Text>
        <View style={styles.view2}>
            <View style={styles.view2}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Order Type" value="" />
                <Picker.Item label="Parcel" value="Parcel" />
                <Picker.Item label="Accessories" value="Accessories" />
                <Picker.Item label="Electronics" value="Electronics" />
                <Picker.Item label="Clothing" value="Clothing" />
                <Picker.Item label="Cosmetics" value="Cosmetics" />
                <Picker.Item label="Medicine" value="Medicine" />
                <Picker.Item label="Beverage" value="Beverage" />
                <Picker.Item label="Food" value="Food" />
             </Picker>
            </View>
            <View style={styles.view2}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Courier Type" value="" style={{border:1}}/>
                <Picker.Item label="Bike" value="bike" />
                <Picker.Item label="Car" value="car" />
            </Picker>
            </View>
            <View>
                <TextInput
                placeholder='Price'
                style={styles.textInput}
                />
            </View>
        </View>

        <View>
            <Text style={styles.text2}>From...</Text>
            <View>
            <TextInput
                placeholder='Business Name'
                style={styles.textInput}
                />
            </View>
            <View>
            <TextInput
                placeholder='Business Contact'
                style={styles.textInput}
                />
            </View>
            <View>
            <TextInput
                placeholder='Business Location'
                style={styles.textInput}
                />
            </View>
        </View>

        <View>
            <Text style={styles.text2}>To...</Text>
            <View>
            <TextInput
                placeholder='Customer name'
                style={styles.textInput}
                />
            </View>
            <View>
            <TextInput
                placeholder='Customer Contact'
                style={styles.textInput}
                />
            </View>
            <View>
            <TextInput
                placeholder='Customer Location'
                style={styles.textInput}
                />
            </View>
        </View>
        <View>
            <TouchableOpacity
            onPress={''}
            style={{backgroundColor:'black',padding:5}}>
              <Text style={{textAlign:'center',color:'white', fontSize:16 }}>Submit</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style = 'light'  backgroundColor = '#FF8C00' translucent = {true}/>
          </View>
    </ScrollView>
  )
}

export default RequestScreen



const styles = StyleSheet.create({


  container: {
      flex: 1,
      paddingTop:parameters.statusBarHeight,
      paddingBottom:30,
      margin: 10,
      padding:10
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
     
    },
    view1: {
        flex:1
    },
    view2: {
        marginBottom:10,

    },

    text1:{
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20

    },
    text2:{
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10

    },
    textInput: {
        height: 50,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: .5,
        marginBottom: 10,
        borderRadius:3,
        padding: 10,
      },

      picker:{
        backgroundColor: colors.grey4,
        borderRadius:10
      }
  
})