import React, {useCallback, useState} from 'react'
import type {FC, Dispatch, SetStateAction} from 'react'
import {View,Text,Image, Alert} from 'react-native'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from './Person.style'
import * as D from '../data'
import { Avatar, IconText } from '../components'
import moment from 'moment-with-locales-es6'

moment.locale('ko')

export type PersonIconProps = {
    person : D.IPerson
    setPerson : Dispatch<SetStateAction<D.IPerson>>
}


//prettier-ignore
const PersonUsingValueState : FC<PersonIconProps> =({person, setPerson}) => {


    // const commentPressed = useCallback(
    //     () => setPerson((person)=> {
    //         const {comment} = person.counts
    //         return {...person, counts : {...person.counts, comment : comment +1}}
    //     }),
    //     []
    // )
    // const retweetPressed = useCallback(
    //     () => setPerson((person)=> {
    //         const {retweet} = person.counts
    //         return {...person, counts : {...person.counts, retweet : retweet +1}}
    //     }),
    //     []
    // )
    // const heartPressed = useCallback(
    //     () => setPerson((person)=> {
    //         const {heart} = person.counts
    //         return {...person, counts : {...person.counts, heart : heart +1}}
    //     }),
    //     []
    // )

    const commentIconPressed = useCallback(()=> setPerson(person=> ({
        ...person,
        counts : {
            ...person.counts,
            comment : person.counts.comment + 1
        }
      }
    )), [])

    const retweetIconPressed = useCallback(()=> setPerson(person=> ({
        ...person,
        counts : {
            ...person.counts,
            retweet : person.counts.retweet + 1
        }
      }
    )), [])

    const heartIconPressed = useCallback(()=> setPerson(person=> ({
        ...person,
        counts : {
            ...person.counts,
            heart : person.counts.heart + 1
        }
      }
    )), [])

    return (
        <View style={[styles.countsView]}>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={commentIconPressed} name='comment' size={24} 
                    color={Colors.blue500} textStyle={[styles.iconText]} text={person.counts.comment}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={retweetIconPressed} name='twitter-retweet' size={24} 
                    color={Colors.purple500} textStyle={[styles.iconText]} text={person.counts.retweet}></IconText>
                    <IconText viewStyle={[styles.touchableIcon]} onPress={heartIconPressed} name='heart' size={24} 
                    color={Colors.red500} textStyle={[styles.iconText]} text={person.counts.heart}></IconText>
        </View>
    )
}

export default PersonUsingValueState