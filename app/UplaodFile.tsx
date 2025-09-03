// Import necessary modules from Expo and React Native
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Main component for uploading an image file
export default function UplaodFile() {
  // State to store the selected image URI
  const [image, setImage] = useState<string | null>(null);
  // State to show loading indicator during upload
  const [uploading, setUploading] = useState(false);

  // Function to pick an image from the device's gallery
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to upload the selected image to the server
  const UploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpg",
      } as any);

      /// Make sure to replace the URL with your actual endpoint
      // The one you have on you backend after forwording the port on VS code
      const response = await fetch(
        "https://sd0q9ts3-5123.euw.devtunnels.ms/auth/profile-pic",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Upload successful!");
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Profile Picture</Text>

      {/* Show selected image preview */}
      {image ? (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      ) : (
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      {/* Button to pick image */}
      <TouchableOpacity style={styles.button} onPress={PickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>

      {/* Button to upload image */}
      <TouchableOpacity
        style={[styles.button, !image && styles.buttonDisabled]}
        onPress={UploadImage}
        disabled={!image || uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Upload Image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#22223b",
  },
  imagePreview: {
    width: 220,
    height: 140,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4a4e69",
    backgroundColor: "#fff",
  },
  placeholderBox: {
    width: 220,
    height: 140,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4a4e69",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 180,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#bfc0c0",
  },
});
