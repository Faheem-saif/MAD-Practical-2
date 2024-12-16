import React from "react";
import { View, Text, Button } from "react-native";
import { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: () => void; // Define the type for the onEdit callback
}

export default function RecipeCard({ recipe, onEdit }: RecipeCardProps) {
  return (
    <View style={{ padding: 10, marginBottom: 10, borderWidth: 1, borderColor: "#ccc" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{recipe.title}</Text>
      <Text>Ingredients: {recipe.ingredients.join(", ")}</Text>
      <Text>Steps: {recipe.preparationSteps}</Text>
      <Button title="Edit" onPress={onEdit} />
    </View>
  );
}
