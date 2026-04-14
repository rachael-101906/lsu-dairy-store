import { Image, TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

interface SearchBarProps {
  placeHolder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  placeHolder,
  onPress,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row bg-white rounded-full border border-black mr-5 px-5 py-4">
      {/* Search Icon on the Left Side of the Search Bar */}
      <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      <TextInput
        placeholder={placeHolder}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#000000"}
        className="flex-1 text-black ml-3"
        autoComplete="off"
      />
    </View>
  );
};

export default SearchBar;
