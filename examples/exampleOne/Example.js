import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {AuthInput} from 'auth-input'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const nameHandler = (text) => {
    setName(text)
  }

  const emailHandler = (text) => {
    setEmail(text)
  }

  const passwordHandler = (text) => {
    setPassword(text)
  }

  const phoneHandler = (text) => {
    setPhone(text)
  }

  return (
      <View style={styles.container}>
        <AuthInput
            type="name"
            label="Name"
            keyboardType="default"
            minLength={2}
            maxLength={25}
            autoCapitalize="words"
            errorText="Please, use a valid username."
            onInputChange={nameHandler}
            value={name}
            borderColor="#282e3b"
            textColor="black"
            errorTextColor="red"
            labelFontSize={20}
        />

        <AuthInput
            type="phone"
            label="Phone number"
            keyboardType="phone-pad"
            minLength={11}
            maxLength={14}
            autoCapitalize="none"
            errorText="Please, use a valid phone number."
            onInputChange={phoneHandler}
            initialValue="your phone"
            value={phone}
        />

        <AuthInput
            type="email"
            label="E-Mail"
            keyboardType="email-address"
            minLength={5}
            maxLength={35}
            autoCapitalize="none"
            errorText="Please, use a valid e-mail."
            onInputChange={emailHandler}
            initialValue="your email"
            value={email}
            borderColor="#282e3b"
            textColor="black"
            errorTextColor="red"
            labelFontSize={20}
        />
        <AuthInput
            type="password"
            label="Password"
            keyboardType="default"
            minLength={5}
            maxLength={15}
            autoCapitalize="none"
            errorText="Please, use a valid password."
            onInputChange={passwordHandler}
            initialValue="your password"
            value={password}
            borderColor="#282e3b"
            textColor="black"
            errorTextColor="red"
            labelFontSize={20}
            labelColor="#282e3b"
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
