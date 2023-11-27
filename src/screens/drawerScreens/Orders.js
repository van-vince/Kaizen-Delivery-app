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
import { OrderContext } from "../../context/contexts";
import axios from "axios";

const apiUrl = " https://cattle-fair-filly.ngrok-free.app";

const Orders = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatchOrders } = useContext(OrderContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const orders = async () => {
      setIsLoading(true);
      await axios
        .get(`${apiUrl}/orders`)
        .then(async (res) => {
          setCurrentOrders(res.data);
          // console.log(res.data)
          dispatchOrders({ type: "ADD_ORDERS", payload: { orders: res.data } });
        })
        .catch((err) => {
          alert(err);
        });
      setIsLoading(false);
    };
    orders();
  }, []);

  const newOrders = currentOrders;

  const onSelectSwitch = (value) => {
    setActiveTab(value);
  };

  return (
    <SafeAreaView>
      <View style={{ marginVertical: 10 }}>
        <CustomSwitch
          selectionMode={1}
          option1={"Active Orders"}
          option2={"Completed Orders"}
          onSelectSwitch={onSelectSwitch}
        />
      </View>
      <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        {activeTab === 1 &&
          newOrders?.map((item, index) => (
            <OrderItem
              key={item.id}
              title={item.customerInfo[0].name}
              dropOff={item.customerInfo[0].location}
              subTitle={item.createdAt}
              photo={require("../../../assets/package3.png")}
              onPress={() => {
                navigation.navigate("DetailsScreen", { id: item._id });
              }}
            />
          ))}
        {isLoading && <ActivityIndicator size={"large"} />}
        {activeTab === 2 && <Text>Completed Orders</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
