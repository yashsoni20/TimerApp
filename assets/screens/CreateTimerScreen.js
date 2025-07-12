import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { TimerContext } from "../contexts/TimerContext";

const predefinedCategories = [
  "Study",
  "Break",
  "Party",
  "Workout",
  "Play",
  "Custom",
];
const predefinedDurations = [
  { label: "30 seconds", value: 30 },
  { label: "1 minute", value: 60 },
  { label: "2 minutes", value: 120 },
  { label: "5 minutes", value: 300 },
  { label: "10 minutes", value: 600 },
  { label: "Custom", value: "custom" },
];

const CreateTimerScreen = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(predefinedDurations[0].value);
  const [customDuration, setCustomDuration] = useState("");
  const [category, setCategory] = useState(predefinedCategories[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [halfwayAlertEnabled, setHalfwayAlertEnabled] = useState(false);

  const durationInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const navigation = useNavigation();
  const { dispatch } = useContext(TimerContext);

  useEffect(() => {
    if (duration === "custom") {
      setTimeout(() => durationInputRef.current?.focus(), 100);
    } else {
      durationInputRef.current?.blur();
    }

    if (category === "Custom") {
      setTimeout(() => categoryInputRef.current?.focus(), 100);
    } else {
      categoryInputRef.current?.blur();
    }
  }, [duration, category]);

  const handleCreate = () => {
    const finalDuration =
      duration === "custom" ? Number(customDuration) : Number(duration);
    const finalCategory =
      category === "Custom" ? customCategory || "Custom" : category;

    if (!name || isNaN(finalDuration) || finalDuration <= 0) {
      alert("Please enter a valid name and duration.");
      return;
    }

    const timer = {
      id: uuid.v4(),
      name,
      duration: finalDuration,
      remaining: finalDuration,
      category: finalCategory,
      status: "Paused",
      halfwayAlertEnabled,
    };

    dispatch({ type: "ADD_TIMER", payload: timer });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.label}>Timer Name</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Timer Name"
        />

        <Text style={styles.label}>Duration</Text>

        <View style={styles.optionsContainer}>
          {predefinedDurations.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setDuration(item.value)}
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    duration === item.value ? "#222222" : "white",
                },
              ]}
            >
              {item.value === "custom" ? (
                <TextInput
                  ref={durationInputRef}
                  value={customDuration}
                  onChangeText={setCustomDuration}
                  onPress={() => setDuration(item.value)}
                  style={{
                    color: "white",
                    flex: 1,
                  }}
                  placeholder="Custom"
                  placeholderTextColor={
                    duration === item.value ? "white" : "#222222"
                  }
                  keyboardType="numeric"
                />
              ) : (
                <Text
                  style={{
                    color: duration === item.value ? "white" : "#222222",
                  }}
                >
                  {item.label}
                </Text>
              )}
              {duration === item.value && (
                <Icon
                  name="check"
                  color={"white"}
                  size={18}
                  style={{ marginLeft: 8 }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Category</Text>

        <View style={styles.optionsContainer}>
          {predefinedCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCategory(item)}
              style={[
                styles.optionButton,
                { backgroundColor: category === item ? "#222222" : "white" },
              ]}
            >
              {item === "Custom" ? (
                <TextInput
                  ref={categoryInputRef}
                  value={customCategory}
                  onChangeText={setCustomCategory}
                  onPress={() => setCategory(item)}
                  style={{
                    color: "white",
                    flex: 1,
                  }}
                  placeholder="Custom"
                  placeholderTextColor={category === item ? "white" : "#222222"}
                />
              ) : (
                <Text
                  style={{ color: category === item ? "white" : "#222222" }}
                >
                  {item}
                </Text>
              )}
              {category === item && (
                <Icon
                  name="check"
                  color={"white"}
                  size={18}
                  style={{ marginLeft: 8 }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={[styles.label,{marginTop:0}]}
          >
            Halfway Alert
          </Text>

          <TouchableOpacity
            onPress={() => setHalfwayAlertEnabled(!halfwayAlertEnabled)}
            style={{
              height: 24,
              width: 40,
              borderRadius: 12,
              backgroundColor: halfwayAlertEnabled ? "#222222" : "#ccc",
              justifyContent: "center",
              padding: 3,
            }}
          >
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 9,
                backgroundColor:  "white",
                alignSelf: halfwayAlertEnabled ? "flex-end" : "flex-start",
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleCreate}
          style={{
            width: "100%",
            backgroundColor: "black",
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Create
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  label: {
    marginTop: 15,
    fontSize: 20,
    color: "#555555",
  },
  input: {
    backgroundColor: "white",
    color: "#222222",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  optionButton: {
    width: "48.5%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customInput: {
    flex: 1,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "space-between",
  },
});

export default CreateTimerScreen;
