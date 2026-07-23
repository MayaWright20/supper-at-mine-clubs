import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import { useCallback, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { BORDER_RADIUS } from "@/constants/styles";
import { formatDate } from "@/utils/dates";
import { formatTime } from "@/utils/time";

import { CustomFont } from "../fonts/font";

type Mode = "date" | "time";

interface Props {
  date?: Date;
  onChangeDate?: (date: Date) => void;
  label?: string;
}

export const DateTimeInput = ({
  date: externalDate,
  onChangeDate,
  label = "Date & Time"
}: Props) => {
  const [internalDate, setInternalDate] = useState(new Date());
  const [mode, setMode] = useState<Mode>("date");
  const [show, setShow] = useState(false);

  // Use a ref to always have access to the latest date value in callbacks
  const latestDateRef = useRef(externalDate ?? internalDate);
  latestDateRef.current = externalDate ?? internalDate;

  const selectedDate = externalDate ?? internalDate;

  const onDateSelected = useCallback(
    (pickedDate: Date) => {
      const currentDate = latestDateRef.current;

      // Preserve the time from the previously selected date
      const newDate = new Date(pickedDate);
      newDate.setHours(currentDate.getHours());
      newDate.setMinutes(currentDate.getMinutes());
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      setInternalDate(newDate);
      latestDateRef.current = newDate;
      onChangeDate?.(newDate);
    },
    [onChangeDate]
  );

  const onTimeSelected = useCallback(
    (pickedDate: Date) => {
      const currentDate = latestDateRef.current;

      // Apply the picked time to the current date
      const newDate = new Date(currentDate);
      newDate.setHours(pickedDate.getHours());
      newDate.setMinutes(pickedDate.getMinutes());
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      setInternalDate(newDate);
      latestDateRef.current = newDate;
      onChangeDate?.(newDate);
    },
    [onChangeDate]
  );

  const showDatepicker = useCallback(() => {
    setMode("date");
    setShow(true);

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: latestDateRef.current,
        mode: "date",
        is24Hour: true,
        onChange: (_event: DateTimePickerEvent, date?: Date) => {
          if (date) {
            onDateSelected(date);
            // After picking date, show time picker
            DateTimePickerAndroid.open({
              value: latestDateRef.current,
              mode: "time",
              is24Hour: true,
              onChange: (_event: DateTimePickerEvent, time?: Date) => {
                if (time) {
                  onTimeSelected(time);
                }
              }
            });
          }
        }
      });
    }
  }, [onDateSelected, onTimeSelected]);

  const showTimepicker = useCallback(() => {
    setMode("time");
    setShow(true);

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: latestDateRef.current,
        mode: "time",
        is24Hour: true,
        onChange: (_event: DateTimePickerEvent, date?: Date) => {
          if (date) {
            onTimeSelected(date);
          }
        }
      });
    }
  }, [onTimeSelected]);

  const onChange = useCallback(
    (_event: DateTimePickerEvent, pickedDate?: Date) => {
      // iOS only - hide the picker after selection
      setShow(false);

      if (!pickedDate) return;

      if (mode === "date") {
        onDateSelected(pickedDate);
      } else {
        onTimeSelected(pickedDate);
      }
    },
    [mode, onDateSelected, onTimeSelected]
  );

  const formattedDate = formatDate(selectedDate);
  const formattedTime = formatTime(selectedDate);

  return (
    <View style={styles.container}>
      <CustomFont style={styles.label}>{label}</CustomFont>
      <View style={styles.inputRow}>
        <Pressable
          style={styles.dateButton}
          onPress={showDatepicker}
          android_ripple={{ color: COLORS.PINK_0 }}
        >
          <CustomFont style={styles.dateText}>Date: {formattedDate}</CustomFont>
        </Pressable>

        <Pressable
          style={styles.timeButton}
          onPress={showTimepicker}
          android_ripple={{ color: COLORS.PINK_0 }}
        >
          <CustomFont style={styles.timeText}>Time: {formattedTime}</CustomFont>
        </Pressable>
      </View>

      {/* iOS only - render inline picker that hides after selection */}
      {Platform.OS === "ios" && show && (
        <DateTimePicker
          style={styles.picker}
          testID="dateTimePicker"
          value={selectedDate}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 8
  },
  dateButton: {
    backgroundColor: COLORS.CREAM_0,
    borderColor: COLORS.RED_0,
    borderRadius: BORDER_RADIUS.X_LARGE,
    borderWidth: 1,
    flex: 2,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  dateText: {
    color: COLORS.RED_0,
    fontSize: 14,
    fontWeight: "500"
  },
  inputRow: {
    flexDirection: "row",
    gap: 10
  },
  label: {
    color: COLORS.RED_0,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
    textTransform: "uppercase"
  },
  picker: {
    alignSelf: "center"
  },
  timeButton: {
    backgroundColor: COLORS.CREAM_0,
    borderColor: COLORS.RED_0,
    borderRadius: BORDER_RADIUS.X_LARGE,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  timeText: {
    color: COLORS.RED_0,
    fontSize: 14,
    fontWeight: "500"
  }
});
