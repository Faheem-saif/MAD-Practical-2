import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditRecipe() {
  const { recipeId } = useLocalSearchParams(); // Get recipeId from navigation params
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const [placeholderTitle, setPlaceholderTitle] = useState("");
  const [placeholderIngredients, setPlaceholderIngredients] = useState("");
  const [placeholderSteps, setPlaceholderSteps] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) return;
      try {
        const recipeRef = doc(db, "recipes", recipeId as string);
        const snapshot = await getDoc(recipeRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setPlaceholderTitle(data.title || "");
          setPlaceholderIngredients(data.ingredients?.join(", ") || "");
          setPlaceholderSteps(data.preparationSteps || "");

          // Set values as placeholders initially
          setTitle(data.title || "");
          setIngredients(data.ingredients?.join(", ") || "");
          setSteps(data.preparationSteps || "");
        } else {
          Alert.alert("Error", "Recipe not found.");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        Alert.alert("Error", "Failed to fetch recipe.");
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const updateRecipe = async () => {
    if (!title || !ingredients || !steps) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const recipeRef = doc(db, "recipes", recipeId as string);
      await updateDoc(recipeRef, {
        title,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        preparationSteps: steps,
      });
      Alert.alert("Success", "Recipe updated successfully!");
      router.replace("/");
    } catch (error) {
      console.error("Error updating recipe:", error);
      Alert.alert("Error", "Failed to update recipe.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder={placeholderTitle || "Title"}
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder={placeholderIngredients || "Ingredients (comma separated)"}
        value={ingredients}
        onChangeText={setIngredients}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder={placeholderSteps || "Preparation Steps"}
        value={steps}
        onChangeText={setSteps}
        multiline
        style={{ marginBottom: 20, borderBottomWidth: 1 }}
      />
      <Button title="Update Recipe" onPress={updateRecipe} />
    </View>
  );
}
