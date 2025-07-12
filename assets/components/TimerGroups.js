import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ProgressBar from "./ProgressBar";
import Icon from "react-native-vector-icons/AntDesign";

const TimerGroups = ({
  grouped,
  handleStart,
  handlePause,
  handleReset,
  handleStartAll,
  handlePauseAll,
  handleResetAll,
}) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => {
      const isCurrentlyExpanded = !!prev[category];

      // Collapse all categories first, then toggle the clicked one
      return isCurrentlyExpanded ? {} : { [category]: true };
    });
  };

  return (
    <ScrollView>
      {Object.keys(grouped).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          {/* Category Header */}

          <TouchableOpacity
            onPress={() => toggleCategory(category)}
            style={styles.categoryHeader}
          >
            <View>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.categoryControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => handleStartAll(category)}
                >
                  <Text style={styles.controlText}>Start All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => handlePauseAll(category)}
                >
                  <Text style={styles.controlText}>Pause All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => handleResetAll(category)}
                >
                  <Text style={styles.controlText}>Reset All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Icon
              name={expandedCategories[category] ? "up" : "right"}
              size={18}
              color="#007AFF"
            />
          </TouchableOpacity>

          {/* Timer List */}
          {expandedCategories[category] &&
            grouped[category].map((timer) => (
              <View key={timer.id} style={styles.timerCard}>
                <View>
                  <Text style={styles.timerTitle}>{timer.name}</Text>
                  <Text style={styles.timerStatus}>{timer.status}</Text>
                  <View style={styles.timerControls}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "red",
                        padding: 5,
                        borderRadius: 3,
                        marginRight: 5,
                      }}
                      onPress={() => handleReset(timer)}
                    >
                      <Icon name="reload1" size={14} color="#222222" />
                    </TouchableOpacity>
                    {timer.status === "Paused" ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#222222",
                          padding: 5,
                          borderRadius: 3,
                        }}
                        onPress={() => handleStart(timer)}
                      >
                        <Icon name="caretright" size={14} color="white" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#222222",
                          padding: 5,
                          borderRadius: 3,
                        }}
                        onPress={() => handlePause(timer)}
                      >
                        <Icon name="pause" size={14} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      backgroundColor: "#222222",
                      padding: 5,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 45,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {timer.remaining ?? "N/A"}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressWrapper}>
                  {timer.duration && timer.remaining !== null ? (
                    <ProgressBar
                      progress={timer.remaining / timer.duration}
                      color="#007AFF"
                    />
                  ) : (
                    <Text style={styles.warningText}>Invalid duration</Text>
                  )}
                </View>
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#222222",
    marginTop:5
  },
  categoryControls: {
    flexDirection: "row",
    marginBottom: 10,
  },
  controlButton: {
    backgroundColor: "#222222",
    padding: 5,
    borderRadius: 3,
    alignItems: "center",
    marginRight:5,
    marginTop:10
  },
  controlText: {
    color: "white",
    fontSize:12
  },
  timerCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
    width: "100%",
  },
  timerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  timerTitle: {
    fontSize: 16,
    color: "#222222",
  },
  timerStatus: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  timerSubText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
  },
  progressWrapper: {
    position: "absolute",
    width: "110%",
    bottom: 0,
  },
  warningText: {
    color: "#ff4d4d",
    fontSize: 12,
  },
  timerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timerControlButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: "#222222",
    borderRadius: 8,
    alignItems: "center",
  },
  timerControlText: {
    color: "white",
    fontWeight: "600",
  },
});

export default TimerGroups;
