import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from "../../config/firebaseConfig";
import { addDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";

const ChatScreen = ({ route }) => {
  const { groupId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const messagesCollection = collection(db, 'messages');
      const messagesQuery = await getDocs(query(messagesCollection, where("groupId", "==", groupId)));

      const messagesData = messagesQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchMessages();
    }
  }, [groupId]);
  

  const handleSend = async () => {
    try {
      const messageRef = await addDoc(collection(db, 'messages'),{
        groupId,
        text: newMessage,
        sender: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setMessages([...messages, { id: messageRef.id, groupId, text: newMessage, sender: auth.currentUser.uid, createdAt: new Date() }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Unable to send the message. Please try again later.');
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

export default ChatScreen;
