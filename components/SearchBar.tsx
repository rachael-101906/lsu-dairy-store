import { Image, TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeHolder: string;
  onPress: () => void;
}

const SearchBar = ({ placeHolder, onPress }: Props) => {
  return (
    <View className="flex-row bg-white rounded-full border border-black mr-5 px-5 py-4">
      <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      <TextInput
        placeholder={placeHolder}
        onPress={onPress}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"#000000"}
        className="flex-1 text-black ml-3"
      />
    </View>
  );
};

export default SearchBar;
