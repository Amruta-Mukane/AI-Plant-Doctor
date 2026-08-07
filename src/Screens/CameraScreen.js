import React from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CameraScreen({ navigation }) {
  const [image, setImage] = React.useState(null);

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      navigation.navigate("Result", {
        image: result.assets[0].uri,
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Open Camera" onPress={openCamera} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
      )}
    </View>
  );
}