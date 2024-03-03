import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useTheme } from "react-native-paper";
import { auth, db } from '../../config/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const LocalImage = require("../../assets/texture.jpg");

const SpecialistMessagesScreen = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const { colors } = useTheme();

  const fetchConversations = async () => {
    try {
      const specialistId = auth.currentUser.uid;
      const conversationsCollection = collection(db, 'groups');
      const conversationsQuery = await getDocs(
        query(conversationsCollection, where('specialistId', '==', specialistId))
      );
  
      const conversationsData = [];
  
      for (const docSnap of conversationsQuery.docs) {
        const { patientId } = docSnap.data();
  
        const userDocRef = doc(db, 'users', patientId);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const patientName = userDoc.data().name;
          conversationsData.push({
            id: docSnap.id,
            patientId,
            patientName,
          });
        }
      }
  
      setConversations(conversationsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={LocalImage} resizeMode="cover" style={styles.image}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  navigation.navigate('ChatScreen', {groupId: item.id, patientName: item.patientName});
                }}
              >
                <Text>{item.patientName}</Text>
              </TouchableOpacity>
            )}
          />
        )}
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
    backgroundColor: 'rgb(216, 227, 248)',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  image: {
    flex: 1,
  },
});

export default SpecialistMessagesScreen;
