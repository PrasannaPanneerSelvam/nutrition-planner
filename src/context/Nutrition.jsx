import { createContext, useState } from "react";
import NutritionList from "../constants/nutritionData";

const NutritionContext = createContext();

const NutritionContextProvider = ({ children }) => {
  const [nutritionList, setNutritionList] = useState(() => {
    const result = NutritionList.map((i) => ({
      ...i,
      uiData: {
        ratio: 1,
        isSelected: false,
      },
    }));

    result.sort((aJson, bJson) => {
      const a = aJson["itemName"],
        b = bJson["itemName"];
      return a === b ? 0 : a > b ? 1 : -1;
    });

    return result;
  });

  return (
    <NutritionContext.Provider value={{ nutritionList, setNutritionList }}>
      {children}
    </NutritionContext.Provider>
  );
};

export { NutritionContext, NutritionContextProvider };
