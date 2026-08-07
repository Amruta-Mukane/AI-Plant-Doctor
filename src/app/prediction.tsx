import { View, Text } from "react-native";

export default function PredictionScreen() {
  return (
    <View style={{flex:1,padding:20}}>
      <Text style={{fontSize:30,fontWeight:"bold"}}>
        🤖 AI Disease Detection
      </Text>

      <Text style={{marginTop:20}}>
        Upload a plant image and AI will identify:
      </Text>

      <Text>• Plant Name</Text>
      <Text>• Disease Name</Text>
      <Text>• Confidence Score</Text>
      <Text>• Treatment Suggestions</Text>
    </View>
  );
}