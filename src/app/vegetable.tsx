import { View, Text } from "react-native";

export default function VegetablesScreen() {
  return (
    <View style={{flex:1,padding:20}}>
      <Text style={{fontSize:30,fontWeight:"bold"}}>
        🍅 Vegetables
      </Text>

      <Text style={{marginTop:20}}>
        Supported vegetables:
      </Text>

      <Text>• Tomato</Text>
      <Text>• Potato</Text>
      <Text>• Chili</Text>
      <Text>• Brinjal</Text>
    </View>
  );
}