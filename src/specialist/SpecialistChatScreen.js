import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from "../../config/firebaseConfig";
import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useRoute } from '@react-navigation/native';

const SpecialistChatScreen = () => {
  const route = useRoute();
  const [groupId, setGroupId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchGroupId = async () => {
      try {
        
        const groupsCollectionRef = collection(db, 'groups');

        const groupsQuerySnapshot = await getDocs(query(groupsCollectionRef, where("contact", "==", auth.currentUser.uid)));
        
        if (groupsQuerySnapshot.docs.length > 0) {
          const groupData = groupsQuerySnapshot.docs[0].data();
          setGroupId(groupData.groupId);
        }
      } catch (error) {
        console.error('Error fetching groupId:', error);
      }
    };

    fetchGroupId();
  }, []);

  useEffect(() => {
    if (groupId) {
      const messagesCollectionRef = collection(db, 'messages');
      const groupMessagesQuery = query(messagesCollectionRef, where("groupId", "==", groupId), orderBy("createdAt"));

      const unsubscribe = onSnapshot(groupMessagesQuery, (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesData);
      });
      return () => unsubscribe();
    }
  }, [groupId]);

  const handleSend = async () => {
    try {
      const messagesCollectionRef = collection(db, 'messages');
      await addDoc(messagesCollectionRef, {
        groupId,
        text: newMessage,
        sender: auth.currentUser.uid,
        createdAt: new Date(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  receivedMessage: {
    backgroundColor: '#e5e5e5',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
  },
  sendButtonText: {
    color: '#fff',
  },
});

export default SpecialistChatScreen;
