export type Recipe = {
    id: string;
    title: string;
    ingredients: string[];
    preparationSteps: string;
    imageUrl: string;
  };
  
  export type RecipeFormData = {
    title: string;
    ingredients: string;
    preparationSteps: string;
  };
  