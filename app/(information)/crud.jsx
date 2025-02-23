import React, { useReducer, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

const initialState = {
  notes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          { id: Date.now().toString(), text: action.payload },
        ],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, text: action.payload.text }
            : note
        ),
      };
    default:
      return state;
  }
}

export default function CrudApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [noteText, setNoteText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const currentNoteTextRef = useRef("");

  const addNote = () => {
    if (noteText.trim() !== "") {
      dispatch({ type: "ADD_NOTE", payload: noteText });
      setNoteText("");
    } else {
      Alert.alert("Error", "Note cannot be empty");
    }
  };

  const deleteNote = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  const openEditModal = (id, text) => {
    setCurrentNoteId(id);
    currentNoteTextRef.current = text;
    setIsModalVisible(true);
  };

  const updateNote = () => {
    if (currentNoteTextRef.current.trim() !== "") {
      dispatch({
        type: "UPDATE_NOTE",
        payload: { id: currentNoteId, text: currentNoteTextRef.current },
      });
      setIsModalVisible(false);
      currentNoteTextRef.current = "";
    } else {
      Alert.alert("Error", "Note cannot be empty");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keep Note</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Enter note"
        />
        <Button title="Add Note" onPress={addNote} />
      </View>
      <FlatList
        data={state.notes}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text>{item.text}</Text>
            <View style={styles.noteActions}>
              <TouchableOpacity
                onPress={() => openEditModal(item.id, item.text)}
              >
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Note</Text>
          <TextInput
            style={[styles.input, styles.modalInput]}
            defaultValue={currentNoteTextRef.current}
            onChangeText={(text) => (currentNoteTextRef.current = text)}
            placeholder="Enter note"
            multiline={true}
          />
          <Button title="Update Note" onPress={updateNote} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  modalInput: {
    textAlignVertical: "top",
    textAlign: "left",
    height: 200,
    borderColor: "rgb(0, 123, 255)",
    borderWidth: 2,
    padding: 10,
    borderRadius: 4,
    fontSize: 22,
  },
  noteItem: {
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  noteActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    color: "#007bff",
    marginRight: 30,
    fontWeight: "bold",
  },
  deleteButton: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    alignContent: "center",
    backgroundColor: "#fff",
    textAlign: "left",
    gap: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
