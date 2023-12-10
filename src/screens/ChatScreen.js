import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from "../../config/firebaseConfig";
import { addDoc, collection, query, where, getDocs, serverTimestamp, orderBy } from "firebase/firestore";

const ChatScreen = ({ route }) => {
  const { params } = route;
  const groupId = params?.groupId; 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      if (groupId) {
        const messagesCollection = collection(db, 'messages');
        const messagesQuery = await getDocs(
          query(messagesCollection, where("groupId", "==", groupId), orderBy('createdAt'))
        );
          const messagesData = messagesQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMessages(messagesData);
         // console.log(messagesData)
         setLoading(false);
      }
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  

  function callMessage() {
    //console.log('callMessage')
    fetchMessages()
  }

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      setInterval(callMessage, 3000)
    }
  }, [groupId]);

  const handleSend = async () => {
    try {
      const messageRef = await addDoc(collection(db, 'messages'), {
        groupId,
        text: newMessage,
        sender: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setMessages([...messages, {
        id: messageRef.id,
        groupId,
        text: newMessage,
        sender: auth.currentUser.uid,
        createdAt: new Date(),
      }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Unable to send the message. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator style={{ position: "absolute", alignSelf: "center", top: 25 }} animating={loading} />
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
