import { View, Text, Image } from "react-native";
import React from "react";
type Book = {
  number: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  description: string;
  pages: number;
  cover: string;
  index: number;
};
export default function Card({ book }: { book: Book }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 400,
        width: 300,
      }}
    >
      <Image
        source={{ uri: book.cover }}
        style={{ objectFit: "contain", borderRadius: 10 }}
        width={300}
        height={340}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          padding: 5,
        }}
      >
        {book.title}
      </Text>
    </View>
  );
}
