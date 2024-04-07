import { useContext, useState } from 'react';
import NutritionTable from './components/NutritionTable';
import { NutritionContext } from './context/Nutrition';
import Table from './components/Table';
import { addFloatValues, multiplyFloatValues } from './FloatUtils';
import styles from './app.module.css'

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
    <div className={styles.totalWrapper}>
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

      <div className={styles.checkBoxWrapper} onClick={() => {
        setShowVitaminsAndMinerals(prev => !prev);
      }}>
        <input type="checkbox" onChange={() => {
        }} checked={showVitaminsAndMinerals} />
        <span>Show Vitamins & mineral details</span>
      </div>
      <NutritionTable
        showVitaminsAndMinerals={showVitaminsAndMinerals}
      />
      <div id="PopupHolder"></div>
    </div>
  );
}

export default App;
