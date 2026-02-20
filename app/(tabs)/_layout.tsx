import { icons } from ".../../constants/icons";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
  iconWidth = 80,
  iconHeight = 50,
}: any) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 70,
        gap: 1,
        paddingTop: 40,
      }}
    >
      {icon === icons.iceCreamTab && (
        <ImageBackground
          source={icons.polygon}
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            top: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: iconWidth,
          height: iconHeight,
          marginTop: focused ? 0 : 8,
          tintColor: focused ? "#e2a9f1" : "black",
        }}
      />

      <Text
        style={{
          fontSize: 9,
          marginTop: 3,
          color: "black",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 40,
          marginHorizontal: 0,
          marginBottom: 0,
          height: 110,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 0,
          borderColor: "transparent",
          paddingHorizontal: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.scanner} title="Scan" />
          ),
        }}
      />

      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.iceCreamTab}
              title="Store"
              iconWidth={80}
              iconHeight={60}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.trophy} title="Rewards" />
          ),
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: "Info",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.info} title="Info" />
          ),
        }}
      />
    </Tabs>
  );
}
