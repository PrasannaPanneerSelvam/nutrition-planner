import { createContext, useState } from "react";
import NutritionList from "../constants/nutritionData";
import { debounce } from "./../Utils"

const NutritionContext = createContext();

const localStorageProxy = window.localStorage ?? { setItem: () => { }, getItem: () => { } };

const nutritionRatioCache = JSON.parse(localStorageProxy.getItem('ratioCache') ?? '{}');
const selectedItemsCache = JSON.parse(localStorageProxy.getItem('selectedCache') ?? '{}');

const setNutritionRatioCache = debounce((json) => localStorageProxy.setItem('ratioCache', JSON.stringify(json)));
const setSelectedItemsCache = debounce((json) => localStorageProxy.setItem('selectedCache', JSON.stringify(json)));

const NutritionContextProvider = ({ children }) => {

  const [nutritionList, setNutritionList] = useState(() => {
    const result = NutritionList.map((i) => ({
      ...i,
      uiData: {
        ratio: nutritionRatioCache[i['itemName']] ?? 1,
        isSelected: selectedItemsCache[i['itemName']] ?? false,
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
    setNutritionRatioCache(nutritionRatioCache);
  };

  const setSelectedInCache = (key, isSelected) => {
    selectedItemsCache[key] = isSelected;
    setSelectedItemsCache(selectedItemsCache);
  };

  return (
    <NutritionContext.Provider value={{ nutritionList, setNutritionList, setRatioInCache, setSelectedInCache }}>
      {children}
    </NutritionContext.Provider>
  );
};

export { NutritionContext, NutritionContextProvider };
