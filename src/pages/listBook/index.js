import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity,  Image, Dimensions,  } from 'react-native'
import api from '../../../services/api'
import { Entypo } from '@expo/vector-icons';


export default function ListBook() {

    const [books, setBooks] = useState([])

    async function getListInformations() {

        try {
            const response = await api.get('https://www.googleapis.com/books/v1/volumes?q=SEARCH_TERM')


            await setBooks([response.data])
        } catch (error) {
        }
    }

    function renderItem({ item, index }) {



        return (

            item.items.map((item2, index) => {
                return (
                    
                        <View style={styles.container}>
                            <TouchableOpacity key={index} >
                                <Image style={styles.item} source={{ uri: item2.volumeInfo.imageLinks.thumbnail }} />
                            </TouchableOpacity>
                        </View>
                    
                )
            }))


    }


    useEffect(() => {
        getListInformations()

    }, [])
    return (

       
            <FlatList
                numColumns={3}
                renderItem={renderItem}
                data={books}
                onEndReachedThreshold={0.2}
                keyExtractor={(index) => { return index }}
            />
        

    )
}

const styles = StyleSheet.create({

    container: {
        
        flex: 1,
        marginVertical: 40,
    },
    item: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
    },

});