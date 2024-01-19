import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const LocalImage = require("../../assets/texture.jpg");

const PatientMessagesScreen = () => {
  const [conversations, setConversations] = useState([]);
  const navigation = useNavigation();

  const fetchConversations = async () => {
    try {
      const patientId = auth.currentUser.uid;
      const conversationsCollection = collection(db, 'groups');
      const conversationsQuery = await getDocs(
        query(conversationsCollection, where('patientId', '==', patientId))
      );
  
      const conversationsData = [];
  
      for (const docSnap of conversationsQuery.docs) {
        const { specialistId } = docSnap.data();
  
        const specialistDocRef = doc(db, 'users', specialistId);
        const specialistDoc = await getDoc(specialistDocRef);
  
        if (specialistDoc.exists()) {
          const specialistName = specialistDoc.data().name;
          conversationsData.push({
            id: docSnap.id,
            specialistId,
            specialistName,
          });
        }
      }
  
      setConversations(conversationsData);
    
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };
  


  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <View style={styles.container}>
     <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('ChatScreen', { groupId: item.id, specialistName: item.specialistName });
            }}
          >
            <Text>{item.specialistName}</Text>
          </TouchableOpacity>
        )}
      />
     </ImageBackground> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "rgb(216, 227, 248)",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    resizeMode: "cover", 
    justifyContent: "center",
  },
});

export default PatientMessagesScreen;
