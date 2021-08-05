import React, {useCallback, useState} from 'react'
import type {FC} from 'react'
import {View,Text,Image, Alert} from 'react-native'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from './Person.style'
import * as D from '../data'
import { Avatar, IconText } from '../components'
import moment from 'moment-with-locales-es6'

//자식 컴포넌트 불러오기
import PersonIcons from './PersonIcon'

moment.locale('ko')

export type PersonProps = {
    person : D.IPerson
}


//prettier-ignore
const PersonUsingPassingSate : FC<PersonProps> =({person : initialPerson}) => {
    const avatarPressed = useCallback(() => Alert.alert('avatar pressed'), [])
    const deletedPressed = useCallback(() => Alert.alert('delete pressed'), [])

    const [myperson, setPerson] = useState<D.IPerson>({
        ...initialPerson,
        counts : {comment : 100, retweet : 10, heart:20}
    })

    return (
        <View style={[styles.view]}>
            <View style={[styles.leftView]}>
                <Avatar imageStyle={[styles.avatar]} uri={myperson.avatar} size={50} onPress={avatarPressed}></Avatar>
            </View>
            <View style={[styles.rightView]}>
                <Text style={[styles.name]}>{myperson.name}</Text>
                <Text style={[styles.email]}>{myperson.email}</Text>
                <View style={[styles.dateView]}>
                    <Text style={[styles.text]}>
                        {moment(myperson.createdDate).startOf('day').fromNow()}
                    </Text>
                    <Icon name='trash-can-outline' size={26} color={Colors.lightBlue500} onPress={deletedPressed}/>
                </View>
                <Text numberOfLines={3} ellipsizeMode='tail' style={[styles.text, styles.comments]}>{myperson.comments}</Text>
                <Image style={[styles.image]} source={{uri : myperson.image}}></Image>
                {/* <View style={[styles.countsView]}>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={countIconPressed('comment')} name='comment' size={24} 
                    color={Colors.blue500} textStyle={[styles.iconText]} text={myperson.counts.comment}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={countIconPressed('retweet')} name='twitter-retweet' size={24} 
                    color={Colors.purple500} textStyle={[styles.iconText]} text={myperson.counts.retweet}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={countIconPressed('heart')} name='heart' size={24} 
                    color={Colors.red500} textStyle={[styles.iconText]} text={myperson.counts.heart}></IconText>
                </View> */}
                <PersonIcons person={myperson} setPerson={setPerson}/>
            </View>
        </View>
    )
}

export default PersonUsingPassingSate