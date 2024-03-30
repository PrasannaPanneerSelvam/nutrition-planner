import { createContext, useState } from "react";
import NutritionList from "../constants/nutritionData";

const NutritionContext = createContext();

const NutritionContextProvider = ({ children }) => {

  const nutritionRatioCache = JSON.parse(localStorage.getItem('ratioCache') ?? '{}');

  const [nutritionList, setNutritionList] = useState(() => {
    const result = NutritionList.map((i) => ({
      ...i,
      uiData: {
        ratio: nutritionRatioCache[i['itemName']] ?? 1,
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


  const setRatioInCache = (key, ratio) => {
    nutritionRatioCache[key] = ratio;
    localStorage.setItem('ratioCache', JSON.stringify(nutritionRatioCache));
  };

  return (
    <NutritionContext.Provider value={{ nutritionList, setNutritionList, setRatioInCache }}>
      {children}
    </NutritionContext.Provider>
  );
};

export { NutritionContext, NutritionContextProvider };
