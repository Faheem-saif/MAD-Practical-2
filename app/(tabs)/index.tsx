import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from "expo-router";

import { Recipe } from "../../types";
import RecipeCard from "./screens/RecipeCard";

type NavigationProps = {
  navigate: (screen: string, params?: { recipeId: string }) => void;
};

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
      setRecipes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Recipe)));
    });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onEdit={() => navigation.navigate("edit-recipe", { recipeId: item.id })}
          />
        )}
      />
    </View>
  );
}
