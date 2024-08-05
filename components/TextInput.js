import { TextInput } from "react-native-paper";

export default function Input({
  label,
  style,
  isPassword,
  placeholder,
  value,
  disabled,
  onChange,
  outlineColor,
  keyboardType,
  onSubmitEditing,
}) {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={[
        style,
        {
          backgroundColor: '#F4F5F9',
          fontSize: 15,
          height: 40, 
          paddingVertical: 12, 
          lineHeight: 20, 
        },
      ]}
      placeholder={placeholder}
      activeOutlineColor="#A5A7A8"
      placeholderTextColor="#A5A7A8"
      theme={{
        fonts: { bodyLarge: { fontFamily: "InterRegular" } },
        roundness: 10,
        colors: {
          outline: outlineColor || "#F4F5F9",
        },
      }}
      secureTextEntry={isPassword}
      value={value}
      disabled={disabled}
      onChangeText={onChange}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
    />
  );
}
