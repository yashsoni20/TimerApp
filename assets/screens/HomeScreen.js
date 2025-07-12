// screens/HomeScreen.js
import React, { useContext, useRef,useEffect,useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity,StyleSheet } from "react-native";
import { TimerContext } from "../contexts/TimerContext";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";
import TimerGroups from "../components/TimerGroups";
import CompletionModal from "../components/CompletionModal";

const HomeScreen = () => {
  const { state, dispatch } = useContext(TimerContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState('');

  const navigation = useNavigation();

  const grouped = (state.timers || []).reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});
  const intervals = useRef({});
  useEffect(() => {
    state.timers.forEach(timer => {
      if (timer.status === 'Completed' && intervals.current[timer.id]) {
        clearInterval(intervals.current[timer.id]);
        delete intervals.current[timer.id];

        dispatch({
          type: 'COMPLETE_TIMER',
          payload: timer.id,
          log: { name: timer.name, completedAt: new Date().toISOString() },
        });

        setCompletedTimerName(timer.name);
        setModalVisible(true);
      }
    });
  }, [state.timers]);
  const handleStart = (timer) => {
    if (timer.status === "Running") return;
  
    if (intervals.current[timer.id]) {
      clearInterval(intervals.current[timer.id]); // clear if already running
    }
  
    intervals.current[timer.id] = setInterval(() => {
      dispatch({ type: 'DECREMENT_TIMER', payload: { id: timer.id } });
    }, 1000);
  };
  

  const handlePause = (timer) => {
    clearInterval(intervals.current[timer.id]);
    dispatch({ type: "UPDATE_TIMER", payload: { ...timer, status: "Paused" } });
  };

  const handleReset = (timer) => {
    clearInterval(intervals.current[timer.id]);
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        ...timer,
        remaining: timer.duration,
        status: "Paused",
      },
    });
  };

  const handleStartAll = (category) => {
    grouped[category].forEach(timer => {
      if (timer.status !== 'Running') {
        handleStart(timer);
      }
    });
  };
  
  const handlePauseAll = (category) => {
    grouped[category].forEach(timer => {
      if (timer.status === 'Running') {
        handlePause(timer);
      }
    });
  };
  
  const handleResetAll = (category) => {
    grouped[category].forEach(timer => {
      handleReset(timer);
    });
  };
  

  return (
    <View style={state.timers && state.timers.length === 0 ? styles.blankContainer : styles.timerContainer}>
   {/* <Button
        title="Add Timer"
        onPress={() => navigation.navigate("CreateTimer")}
      />
      <Button title="History" onPress={() => navigation.navigate("History")} /> */}
      {state.timers && state.timers.length === 0 ? (
        <Text>No timers available. Add one!</Text>
      ) : (
        <TimerGroups
          grouped={grouped}
          handleStart={handleStart}
          handlePause={handlePause}
          handleReset={handleReset}
          handleStartAll={handleStartAll}
          handlePauseAll={handlePauseAll}
          handleResetAll={handleResetAll}
        />
      )}
      <CompletionModal
        visible={modalVisible}
        timerName={completedTimerName}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blankContainer:{ padding: 20 ,justifyContent:'center',alignItems:'center',flex:1},
  timerContainer:{ paddingHorizontal: 20 ,marginTop:20}
})
export default HomeScreen;
