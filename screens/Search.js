import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class SearchScreen extends React.Component {
    render() {
        return (
            <View style = {styles.search}>
                <Text style = {styles.text}> Search Screen </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    search: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgreen",
    },
    text: {
        fontSize: 50,
        color: "orange"
    }
})