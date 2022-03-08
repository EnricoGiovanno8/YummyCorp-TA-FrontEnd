import React, { useContext, useState } from "react";
import { Box, Header, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Image, TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import AuthContext from "../../../context/AuthContext";
import { URL } from "../../../context";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
export const assets = [
  require("./assets/camera.png"),
  require("./assets/gallery.png"),
];

interface FormDataValue {
  uri: string;
  name: string;
  type: string;
}

interface FormDataType {
  append(
    name: string,
    value: string | Blob | FormDataValue,
    fileName?: string
  ): void;
}

const Camera = ({ navigation }: HomeNavigationProps<"Camera">) => {
  const {
    user,
    uploadSuccess,
    errorUpload,
    uploadProfilePicture,
    resetUpload,
  } = useContext(AuthContext);
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onGoBack = async () => {
    setImage(null);
    await resetUpload();
    navigation.goBack();
  };

  const upload = async () => {
    if (image) {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      const fileName = image.replace(/^.*[\\\/]/, "");
      const type = `image/${ext}`;

      let formData: FormDataType = new FormData();
      formData.append("image", {
        name: fileName,
        uri: image,
        type,
      });

      await uploadProfilePicture(formData);
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Camera"
        left={{
          icon: "arrow-left",
          onPress: () => onGoBack(),
        }}
      />
      <Box
        flex={1}
        backgroundColor="background"
        padding="m"
        alignItems="center"
      >
        <Box
          width={300}
          height={300}
          borderWidth={5}
          // @ts-ignore
          borderRadius="l"
          overflow="hidden"
          style={{
            borderColor: "rgba(0,0,0,0.1)",
          }}
        >
          {image && user ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={{ uri: `${URL}/profile-picture/${user?.image}` }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
        <Box marginTop="xl">
          <Box
            width={300}
            height={50}
            // @ts-ignore
            borderRadius="m"
            overflow="hidden"
            style={{
              elevation: 5,
              shadowColor: "black",
            }}
            backgroundColor="pictureButton"
            justifyContent="center"
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="image" size={30} color="white" />
              <Text marginLeft="m" variant="button" color="white">
                Pick From Gallery
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            width={300}
            height={50}
            // @ts-ignore
            borderRadius="m"
            overflow="hidden"
            style={{
              elevation: 5,
              shadowColor: "black",
            }}
            backgroundColor="pictureButton"
            justifyContent="center"
            marginTop="m"
          >
            <TouchableOpacity
              onPress={takePicture}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="camera" size={30} color="white" />
              <Text marginLeft="m" variant="button" color="white">
                Take Picture
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            width={300}
            height={50}
            // @ts-ignore
            borderRadius="m"
            overflow="hidden"
            style={{
              elevation: 5,
              shadowColor: "black",
            }}
            backgroundColor="home"
            justifyContent="center"
            marginTop="m"
            opacity={image ? 1 : 0.5}
          >
            <TouchableOpacity
              onPress={upload}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={image ? false : true}
            >
              <Icon name="upload-cloud" size={30} color="white" />
              <Text marginLeft="m" variant="button" color="white">
                Upload Picture
              </Text>
            </TouchableOpacity>
          </Box>
          {uploadSuccess && (
            <Box alignItems="center" marginTop="m">
              <Text variant="success">Upload Success</Text>
            </Box>
          )}
          {errorUpload && (
            <Box alignItems="center" marginTop="m">
              <Text variant="error">Upload Fail</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Camera;
