import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity,  Image, Dimensions,  } from 'react-native'
import api from '../../../services/api'
import { Entypo } from '@expo/vector-icons';

const numColumns = 3;
export default function ListBook() {

    const [books, setBooks] = useState([])

  async function getListInformations() {

    try {
      const response = await api.get('https://www.googleapis.com/books/v1/volumes?q=SEARCH_TERM')

      await setBooks(response.data.items)
       console.log(books.length)
    } catch (error) {
    }
  }

  useEffect(() => {
    getListInformations()

  }, [])

 

  const formatData = (data, numColumns) => {

    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      books.push({
        "volumeInfo": {
          "imageLinks": {
            "smallThumbnail": "",
            "thumbnail": ""
          },
        }, empty: true
      });
      numberOfElementsLastRow++;
      
    }

    return data;
  };

  function renderItem({ item, index }) {
     console.log(item.empty )

    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
 
        return (

          <View style={styles.container}>
            <TouchableOpacity key={index} >
              <Image resizeMode="stretch" style={styles.item} source={{ uri: item.volumeInfo.imageLinks.thumbnail }} />
            </TouchableOpacity>
          </View>

        )
  };


  return (
    <FlatList
      data={formatData(books, numColumns)}
      style={styles.container}
      renderItem={renderItem}
      numColumns={numColumns}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4D243D',
    flex: 1,
   
  },
  item: {
    backgroundColor: '#4D243D',
    width: 150,
    alignItems:'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
