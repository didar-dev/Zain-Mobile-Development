import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Card from "@/components/Card";

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

export default function Index() {
  const [Books, setBooks] = useState<Book[]>([]);

  const FetchBooks = async () => {
    await fetch(`${process.env.EXPO_PUBLIC_API}books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    FetchBooks();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 10 }}>
        Books
      </Text>
      <FlatList
        data={Books}
        keyExtractor={(item) => item.index.toString()}
        horizontal
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <Card book={item}  />}
      />
    </View>
  );
}
