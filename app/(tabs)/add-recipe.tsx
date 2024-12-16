import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);

  // Save Recipe to Firestore without Image
  const saveRecipe = async () => {
    if (!title || !ingredients || !steps) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      // Save Recipe Data to Firestore (imageUrl is optional here)
      await addDoc(collection(db, "recipes"), {
        title,
        ingredients: ingredients.split(","),
        preparationSteps: steps,
        imageUrl: "https://via.placeholder.com/150", // Placeholder Image URL
        createdAt: new Date(),
      });

      setLoading(false);
      Alert.alert("Success", "Recipe saved successfully!");
      // Reset fields
      setTitle("");
      setIngredients("");
      setSteps("");
    } catch (error) {
      console.error("Error saving recipe: ", error);
      setLoading(false);
      Alert.alert("Error", "Failed to save recipe. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Preparation Steps"
        value={steps}
        onChangeText={setSteps}
        multiline
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <Button
        title={loading ? "Saving..." : "Save Recipe"}
        onPress={saveRecipe}
      />
    </View>
  );
}
