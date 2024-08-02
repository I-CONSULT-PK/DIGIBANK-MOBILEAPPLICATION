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
}) {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={[style]}
      className="bg-[#F4F5F9] text-[15px] border border-gray-200 rounded-lg pr-1"
      placeholder={placeholder}
      activeOutlineColor="#A5A7A8"
      placeholderTextColor={"#A5A7A8"}
      theme={{
        fonts: { bodyLarge: { fontFamily: "InterMedium"} },
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
    />
  );
}