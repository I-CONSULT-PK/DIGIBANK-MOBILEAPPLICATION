import { TextInput } from "react-native-paper";

export default function Input({
  label,
  style,
  isPassword,
  placeholder,
  value,
  disable,
  onChange,
  outlineColor,
  keyboardType,
  onSubmitEditing,
  maxLength
}) {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={[style]}
      className={`${!disable && 'border border-gray-200 rounded-lg bg-[#F4F5F9] text-[14.5px] pr-1'} bg-[#F4F5F9] text-[14.5px]`}
      placeholder={placeholder}
      activeOutlineColor="#A5A7A8"
      placeholderTextColor={"#A5A7A8"}
      theme={{
        fonts: { bodyLarge: { fontFamily: "InterRegular"} },
        roundness: 10,
        colors: {
          outline: "#F4F5F9",
        },
      }}
      secureTextEntry={isPassword}
      value={value}
      disabled={disable}
      onChangeText={onChange}
      outlineColor={outlineColor}
      keyboardType={keyboardType}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      name={label} 
      maxLength={maxLength}
    />
  );
}