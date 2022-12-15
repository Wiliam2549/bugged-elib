import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image } from 'react-native';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import db from "../config";

const bgImage = require("../assets/background2.png");
const appName = require("../assets/appName.png");
const appIcon = require("../assets/appIcon.png");

export default class TransactionScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookId: "",
            studentId: "",
            domState: "normal",
            hasCameraPermissions: null,
            scanned: false,
            scanedData: "",
        }
    }
    getCameraPermissions =async(domState)=> {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        //status == "granted" is true when user has granted permission, or else it's false
        this.setState({
            hasCameraPermissions: status == "granted",
            scanned: false,
            domState: domState,
        });
    }
    handleBarcodeScanned =async({type, data})=> {
        const {domState} = this.state;
        if(domState == "bookId") {
            this.setState({
                bookId: data,
                domState: "normal",
                scanned: true,
            });
        }
        else if(domState == "studentId") {
            this.setState({
                studentId: data,
                domState: "normal",
                scanned: true,
            });
        }
    }
    handleTransaction=()=> {
        const {bookId} = this.state;
        db.collection("books")
        .doc(bookId)
        .get()
        .then((doc)=>{
            console.log(doc.data());
        })
    }
    render() {
        const {bookId, studentId, domState, hasCameraPermissions, scanned, scannedData} = this.state;
        if(domState !== "normal") {
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanned}
                    style = { StyleSheet.absoluteFillObject }
                />
            );
        }
        return (
            <View style = {styles.container}>
                <ImageBackground source = {bgImage} style = {styles.bgImage}>
                    <View style = {styles.upperContainer}>
                        <Image source = {appIcon} style = {styles.appIcon}/>
                        <Image source = {appName} style = {styles.appName}/>
                    </View>
                    <View style = {styles.lowerContainer}>
                        <View style = {styles.textInputContainer}>
                            <TextInput style = {styles.textInput} 
                            placeholder = {"Book Id"}
                            placeholderTextColor = {"white"}
                            value = {bookId}
                            onChangeText = {(text)=>{this.setState({bookId: text})}}/>
                            <TouchableOpacity style = {styles.scanButton} onPress = {()=>{this.getCameraPermissions("bookId")}}>
                                <Text style = {styles.scanButtonText}> Scan </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {[styles.textInputContainer, {marginTop: 30}]}>
                            <TextInput style = {styles.textInput}
                            placeholder = {"Student Id"}
                            placeholderTextColor = {"white"}
                            value = {studentId}
                            onChangeText = {(text)=>{this.setState({studentId : text})}}/>
                            <TouchableOpacity style = {styles.scanButton} onPress = {()=>{this.getCameraPermissions("studentId")}}>
                                <Text style = {styles.scanButtonText}> Scan </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                        style = {styles.submitButton}
                        onPress = {this.handleTransaction}>
                            <Text style = {styles.buttonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "aqua",
    },
    upperContainer: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    appIcon: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        marginTop: 40,
    },
    appName: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    lowerContainer: {
        flex: 0.5,
        alignItems: "center",
    },
    textInputContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "white",
        backgroundColor: "blue",
    },
    textInput: {
        width: "60%",
        height: 50,
        padding: 10,
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 20,
        backgroundColor: "red",
        fontFamily: "Rajdhani_600SemiBold",
        color: "white",
    },
    scanButton: {
        width: 170,
        height: 50,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    scanButtonText: {
        fontSize: 20,
        fontColor: "white",
        fontFamily: "Rajdhani_600SemiBold",
    },
    text: {
        fontSize: 30,
        color: "red",
    },
    button: {
        width: "50%",
        height: 60,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "lightgreen",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    submitButton: {
        width: "60%",
        height: 40,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "red",
        borderRadius: 20,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 30,
        color: "white",
        fontFamily: "Rajdhani_600SemiBold",
    },
})