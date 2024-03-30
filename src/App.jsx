import { useContext, useState } from 'react';
import NutritionTable from './components/NutritionTable';
import { NutritionContext } from './context/Nutrition';
import Table from './components/Table';
import { addFloatValues, multiplyFloatValues } from './FloatUtils';


function App() {

  const { nutritionList } = useContext(NutritionContext);
  const [showVitaminsAndMinerals, setShowVitaminsAndMinerals] = useState(false);

  const selectedItems = nutritionList.filter(item => item.uiData.isSelected);

  const computeTotalByKey =
    (key) =>
      selectedItems
        .reduce((acc, item) =>
          (addFloatValues(acc, multiplyFloatValues(item[key], item.uiData.ratio))),
          0
        );


  return (
    <>
      <Table
        cellData={[
          ['Energy (kcal)', computeTotalByKey('energy_kcal')],
          ['Carbs (g)', computeTotalByKey('carbohydrates_g')],
          ['Protein (g)', computeTotalByKey('protein_g')],
          ['Fats (g)', computeTotalByKey('fats_g')]
        ]}
        cellKeys={[]}
        headers={
          ['Nutrients', 'Selected Quantity']
        }
        selectedRowIndices={[]}
        selectRow={() => { }}
        sortColumnBy={() => { }}
      />

      <div onClick={() => {
        setShowVitaminsAndMinerals(prev => !prev);
      }}>
        <div></div>
        <span>Show Vitamins & mineral details</span>
      </div>
      <NutritionTable
        showVitaminsAndMinerals={showVitaminsAndMinerals}
      />
      <div id="PopupHolder"></div>
    </>
  );
}

export default App;
