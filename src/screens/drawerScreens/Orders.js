import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomSwitch from "../../components/CustumSwitch";
import OrderItem from "../../components/OrderItems";
import { AuthContext, OrderContext } from "../../context/contexts";
import axios from "axios";


const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const Orders = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatchOrders } = useContext(OrderContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const { userInfo } = useContext(AuthContext);
  const customer = userInfo?.customer;

  const id = customer._id;


  useEffect(() => {
    const orders = async () => {
      setIsLoading(true);
      await axios
        .get(`${apiUrl}/customers/${id}`)
        .then(async (res) => {
          // console.log(res.data)
          setCurrentOrders(res.data.allOrders);
          dispatchOrders({ type: "ADD_ORDERS", payload: { orders: res.data.allOrders } });
        })
        .catch((err) => {
          alert(err);
        });
      setIsLoading(false);
    };
    orders();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
    const orders =   axios
        .get(`${apiUrl}/customers/${id}`)
        .then(async (res) => {
          // console.log(res.data)
          setCurrentOrders(res.data.allOrders);
          dispatchOrders({ type: "ADD_ORDERS", payload: { orders: res.data.allOrders } });
        })
        .catch((err) => {
          alert(err);
        });
      setRefreshing(false);
      orders()
    }, 3000);
  }, [currentOrders]);

  const newOrders = [...currentOrders].sort((a, b) => b.id - a.id)
  // console.log(newOrders)


  const onSelectSwitch = (value) => {
    setActiveTab(value);
  };

  return (
    <SafeAreaView>
      <View style={{ marginVertical: 10 }}>
        {/* <CustomSwitch
          selectionMode={1}
          option1={"Active Orders"}
          option2={"Completed Orders"}
          onSelectSwitch={onSelectSwitch}
        /> */}
      </View>
      <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        {/* {activeTab === 1 && */}
        {
          newOrders?.map((item, index) => (
            <OrderItem
              key={item.id}
              title={item.customerInfo[0].name}
              dropOff={item.customerInfo[0].location}
              subTitle={item.createdAt.replace('T', '  ').substring(0, 17)}
              photo={require("../../../assets/package3.png")}
              onPress={() => {
                navigation.navigate("DetailsScreen", { id: item._id });
              }}
            />
          ))
          }
        {isLoading && <ActivityIndicator size={"large"} />}
        {/* {activeTab === 2 && <Text>Completed Orders</Text>} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
