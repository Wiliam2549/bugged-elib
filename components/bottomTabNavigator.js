import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/Search.js";
import TransactionScreen from "../screens/Transaction.js";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
export default class BottomTabNavigator extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Tab.Navigator 
                    screenOptions ={({route}) => ({
                        tabBarIcon: ({focused, color, size})=>{
                            var iconName;
                            if(route.name == "Transaction") {
                                iconName = "book";
                            }
                            else if(route.name == "Search") {
                                iconName = "search"
                            }
                            return (
                                <Ionicons
                                    name = {iconName}
                                    size = {size}
                                    color = {color}
                                />
                            )
                        }
                    })}
                    tabBarOptions = {{
                        activeTintColor: "white",
                        inactiveTintColor: "black",
                        style: {
                            height: 100,
                            borderTopWidth: 0,
                            backgroundColor: "#5653d4",
                        },
                        labelStyle: {
                            fontSize: 20,
                            fontFamily: "Rajdhani_600SemiBold",
                        },
                        labelPosition: "beside-icon",
                        tabStyle: {
                            marginTop : 25,
                            marginLeft: 10,
                            marginRight: 10,
                            borderRadius: 30,
                            borderWidth: 2,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#5653d4",
                        },
                    }}
                >
                    <Tab.Screen name = "Transaction" component = {TransactionScreen}/>
                    <Tab.Screen name = "Search" component = {SearchScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
    
}