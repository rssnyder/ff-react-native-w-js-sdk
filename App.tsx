import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initialize, Event } from '@harnessio/ff-javascript-client-sdk'
import {decode, encode} from 'base-64'
import React, {useState, useRef} from 'react'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

interface Attributes {
    location: string
    lang: string
}
  
interface Target {  
    identifier: string  
    name?: string  
    attributes?: Attributes  
}

interface Options {
    baseUrl?: string
    eventUrl?: string
    eventsSyncInterval?: number
    pollingInterval?: number
    pollingEnabled?: boolean
    streamEnabled?: boolean
    debug?: boolean
}

const target: Target = {
    identifier: "tsjs",
    name: "tsjf",
    attributes: {
        location: "else",
        lang: "eng"
    }
}

const options: Options = {
    baseUrl: "https://config.ff.harness.io/api/1.0",
    eventUrl: "https://events.ff.harness.io/api/1.0"
}

export default function App() {
    const [message, setMessage] = useState('false')

    const cf = initialize(
        '7cfe2f72-50ab-4ec6-9537-cbfae942063e',
        target,
        options
    )
    
    cf.on(Event.READY, flags => {
        console.log(JSON.stringify(flags, null, 2))
        const result = cf.variation('darkMode', false) || false
        setMessage(result.toString())
    })

    return (
        <View style={styles.container}>
            <Text>harnessappdemodarkmode flag: {message}</Text>
            <StatusBar style="auto" />
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
