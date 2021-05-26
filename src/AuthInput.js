import React, { useState} from 'react'
import {View, Text, TextInput, StyleSheet, PixelRatio} from 'react-native'
import {Ionicons} from "@expo/vector-icons";

const AuthInput = props => {

    const [enteredText, setEnteredText] = useState('')
    const [error, setError] = useState(false)

    const [eyeIcon, setEyeIcon] = useState("eye-off");
    const [isPassword, setIsPassword] = useState(true);

    const changePwdType = () => {
        setEyeIcon(isPassword ? "eye" : "eye-off");
        setIsPassword((prevState) => !prevState);
    };

    const { onInputChange, type } = props;

    const inputCheckHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const nameRegex = /^([^0-9]*)$/;

        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (props.required && text.trim().length === 0) {
            setError(true)
        }
        if (type === 'email' && !emailRegex.test(text.toLowerCase())) {
            setError(true)
        }
        if (type === 'name' && !nameRegex.test(text.toLowerCase())) {
            setError(true)
        }
        if (type === 'phone' && !phoneRegex.test(text.toLowerCase())) {
            setError(true)
        }
        if (props.min != null && +text < props.min) {
            setError(true)
        }
        if (props.max != null && +text > props.max) {
            setError(true)
        }
        if (props.minLength != null && text.length < props.minLength) {
            setError(true)
        }
    }

    const lostFocusHandler = () => {
        inputCheckHandler(enteredText)
    }

    const inputHandler = enteredText => {
        if (type === 'phone') {
            setEnteredText(enteredText.replace(/[^0-9+-]/, ''))
            onInputChange(enteredText.replace(/[^0-9+-]/, ''))
        }
        if (type === 'name') {

            setEnteredText(enteredText.replace(/[^a-zA-zА-Яа-я]/, ''))
            onInputChange(enteredText.replace(/[^a-zA-zА-Яа-я]/, ''))
        }
        if (type === 'email' || type === "password") {
            setEnteredText(enteredText)
            onInputChange(enteredText)
        }


        if (error) {
            setError(false)
        }
    };

    return (
        <View style={styles.main}>
            <Text style={{...styles.label, color: props.labelColor ? props.labelColor : props.textColor, fontSize:  props.labelFontSize ? props.labelFontSize : 20  / PixelRatio.getFontScale()}}>{props.label}</Text>
            {type === 'password' ? (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput

                        {...props}
                        style={{...styles.input, borderBottomColor: props.borderColor ? props.borderColor : 'black', color: props.textColor ? props.textColor : 'black'}}
                        onChangeText={inputHandler}
                        onBlur={lostFocusHandler}
                        secureTextEntry={isPassword}
                        autoCapitalize="none"
                        returnKeyType="next"


                    />
                    <Ionicons
                        style={styles.icon}
                        name={eyeIcon}
                        size={22}
                        color={props.textColor ? props.textColor : 'black'}
                        onPress={changePwdType}
                    />
                </View>
            ) : (
                <TextInput
                    {...props}
                    style={{...styles.input, borderBottomColor: props.borderColor ? props.borderColor : 'black', color: props.textColor ? props.textColor : 'black'}}
                    onChangeText={inputHandler}
                    onBlur={lostFocusHandler}
                    autoCapitalize="none"
                    returnKeyType="next"
                    autoCompleteType='off'
                    keyboardType="visible-password"
                />
            ) }

            {error && (
                <View style={{ width: '90%'}}>
                    <Text style={{...styles.errorText, color: props.errorTextColor ? props.errorTextColor : 'red'}}>{props.errorText}</Text>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '90%',
        minWidth: 50,
        borderBottomWidth: 2,
        marginVertical: 5,
        height: 50,
        padding: 10,
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    label: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: '5%',
        marginTop: 10
    },
    errorText: {
        fontSize: 13
    },

    icon: {
        position: "absolute",
        right: 5,
        top: 25
    },
})
export default AuthInput
