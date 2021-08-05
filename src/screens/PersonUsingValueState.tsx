import React, {useCallback, useState} from 'react'
import type {FC} from 'react'
import {View,Text,Image, Alert} from 'react-native'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from './Person.style'
import * as D from '../data'
import { Avatar, IconText } from '../components'
import moment from 'moment-with-locales-es6'

moment.locale('ko')

export type PersonProps = {
    person : D.IPerson
}


//prettier-ignore
const PersonUsingValueState : FC<PersonProps> =({person : initialPerson}) => {
    const avatarPressed = useCallback(() => Alert.alert('avatar pressed'), [])
    const deletedPressed = useCallback(() => Alert.alert('delete pressed'), [])
    const countIconPressed = useCallback((name : string) => () => Alert.alert(`${name} pressed`),
    [])

    //initialPerson.counts.comment, rewtweet, heart
    const [comment, setComment] = useState<number>(initialPerson.counts.comment)
    const [retweet, setRetweet] = useState<number>(initialPerson.counts.retweet)
    const [heart, setHeart] = useState<number>(initialPerson.counts.heart)

    const commentPressed = useCallback(
        () => setComment((comment)=> comment +1),
        []
    )
    const retweetPressed = useCallback(
        () => setRetweet((retweet)=> retweet +1),
        []
    )
    const heartPressed = useCallback(
        () => setHeart((heart)=> heart +1),
        []
    )

    return (
        <View style={[styles.view]}>
            <View style={[styles.leftView]}>
                <Avatar imageStyle={[styles.avatar]} uri={initialPerson.avatar} size={50} onPress={avatarPressed}></Avatar>
            </View>
            <View style={[styles.rightView]}>
                <Text style={[styles.name]}>{initialPerson.name}</Text>
                <Text style={[styles.email]}>{initialPerson.email}</Text>
                <View style={[styles.dateView]}>
                    <Text style={[styles.text]}>
                        {moment(initialPerson.createdDate).startOf('day').fromNow()}
                    </Text>
                    <Icon name='trash-can-outline' size={26} color={Colors.lightBlue500} onPress={deletedPressed}/>
                </View>
                <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.text, styles.comments]}>{initialPerson.comments}</Text>
                <Image style={[styles.image]} source={{uri : initialPerson.image}}></Image>
                <View style={[styles.countsView]}>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={commentPressed} name='comment' size={24} 
                    color={Colors.blue500} textStyle={[styles.iconText]} text={comment}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={retweetPressed} name='twitter-retweet' size={24} 
                    color={Colors.purple500} textStyle={[styles.iconText]} text={retweet}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={heartPressed} name='heart' size={24} 
                    color={Colors.red500} textStyle={[styles.iconText]} text={heart}></IconText>
                </View>
            </View>
        </View>
    )
}

export default PersonUsingValueState