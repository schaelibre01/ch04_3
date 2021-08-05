import React, {useCallback, useState} from 'react'
import type {FC} from 'react'
import {View,Text,Image, Alert} from 'react-native'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from './Person.style'
import * as D from '../data'
import { Avatar, IconText } from '../components'
import moment from 'moment-with-locales-es6'
import Person from '../copy/Person'

moment.locale('ko')

export type PersonProps = {
    person : D.IPerson
}


//prettier-ignore
const PersonUsingObjectState : FC<PersonProps> =({person : initialPerson}) => {
    const avatarPressed = useCallback(() => Alert.alert('avatar pressed'), [])
    const deletedPressed = useCallback(() => Alert.alert('delete pressed'), [])
    const countIconPressed = useCallback((name : string) => () => Alert.alert(`${name} pressed`),
    [])

    const [myperson, setPerson] = useState<D.IPerson>({
        ...initialPerson, counts : {comment : 0, retweet:0, heart: 0}
    })

    const commentIconPressed = useCallback(()=> setPerson(myperson=> ({
        ...myperson,
        counts : {
            ...myperson.counts,
            comment : myperson.counts.comment + 1
        }
      }
    )), [])

    const retweetIconPressed = useCallback(()=> setPerson(myperson=> ({
        ...myperson,
        counts : {
            ...myperson.counts,
            retweet : myperson.counts.retweet + 1
        }
      }
    )), [])

    const heartIconPressed = useCallback(()=> setPerson(myperson=> ({
        ...myperson,
        counts : {
            ...myperson.counts,
            heart : myperson.counts.heart + 1
        }
      }
    )), [])

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
                <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.text, styles.comments]}>{myperson.comments}</Text>
                <Image style={[styles.image]} source={{uri : initialPerson.image}}></Image>
                <View style={[styles.countsView]}>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={commentIconPressed} name='comment' size={24} 
                    color={Colors.blue500 } textStyle={[styles.iconText]} text={myperson.counts.comment}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={retweetIconPressed} name='twitter-retweet' size={24} 
                    color={Colors.purple500 } textStyle={[styles.iconText]} text={myperson.counts.retweet}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={heartIconPressed} name='heart' size={24} 
                    color={Colors.red500 } textStyle={[styles.iconText]} text={myperson.counts.heart}></IconText>
                </View>
            </View>
        </View>
    )
}

export default PersonUsingObjectState