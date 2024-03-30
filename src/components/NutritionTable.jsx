import { useCallback, useContext, useMemo, useState } from 'react';
import Table from './Table';
import Editable from './UI/Editable';
import { NutritionContext } from '../context/Nutrition';
import { multiplyFloatValues } from '../FloatUtils';

const cloneJson = (i) => JSON.parse(JSON.stringify(i));

const mineralNameMap = {
    'Ca': 'Calcium',
    'Fe': 'Iron',
    'K': 'Potassium',
    'Mg': 'Magnesium',
    'Na': 'Sodium',
    'Zn': 'Zinc'
}

const sortByKey = (key) => (aJson, bJson) => {
    let a = aJson[key], b = bJson[key];

    if (typeof aJson[key] === 'number') {
        a = multiplyFloatValues(aJson[key], aJson.uiData.ratio);
        b = multiplyFloatValues(bJson[key], bJson.uiData.ratio);
    }

    return (a === b ? 0 : a > b ? 1 : -1);
}

const headers = [
    'Food item'
    , 'Quantity'
    , 'Energy (kcal)'
    , 'Carbs (g)'
    , 'Protein (g)'
    , 'Fat (g)'
    , 'Vitamins'
    , 'Minerals'
];

const cellKeys = [
    'itemName'
    , 'quantity'
    , 'energy_kcal'
    , 'carbohydrates_g'
    , 'protein_g'
    , 'fats_g'
    , 'vitamins'
    , 'minerals'
];

const allowedSortByFns = (keyName) => {
    const sortByFnValidKeys = [
        'itemName'
        , 'energy_kcal'
        , 'carbohydrates_g'
        , 'protein_g'
        , 'fats_g'
    ];

    if (sortByFnValidKeys.includes(keyName)) return sortByKey(keyName)

    return () => 0
};

function NutritionTable({ showVitaminsAndMinerals }) {

    const { nutritionList, setNutritionList } = useContext(NutritionContext)

    const [sortKey, setSortKey] = useState('itemName');

    const sortAndSetNutritionList = (newList) => {
        newList.sort(allowedSortByFns(sortKey))
        setNutritionList(newList);
    }

    const sortNutritionList = useCallback((key) => {

        const newNutritionList = cloneJson(nutritionList);

        if (key === sortKey) {
            newNutritionList.reverse();
        } else {
            newNutritionList.sort(allowedSortByFns(key));
            setSortKey(key);
        }

        setNutritionList(newNutritionList);
    }, [nutritionList, setNutritionList, sortKey]);

    const selectRowCb = useCallback((selectedRowIndex) => {
        const newNutritionList = cloneJson(nutritionList);

        if (newNutritionList[selectedRowIndex]) {
            newNutritionList[selectedRowIndex].uiData.isSelected = !newNutritionList[selectedRowIndex].uiData.isSelected;
            setNutritionList(newNutritionList);
        }
    }, [nutritionList, setNutritionList]);

    const selectedRowIndices = useMemo(() => {
        return (
            nutritionList
                .map((i, idx) => {
                    if (i.uiData.isSelected === true) return idx;
                    return null;
                })
                .filter(i => i !== null)
        );
    }, [nutritionList]);

    const cellData = nutritionList.map((item) => {
        const ratio = item.uiData.ratio;

        const resultCells = [
            item['itemName'],
            <Editable
                initialValue={item['quantity'].value}
                unit={item['quantity'].unit}
                onValueChange={(newValue) => {
                    const newNutritionList = cloneJson(nutritionList),
                        currentItem = newNutritionList.find(i => item['itemName'] === i['itemName']);

                    if (currentItem) {
                        currentItem.uiData.ratio = newValue / item['quantity'].value;
                        sortAndSetNutritionList(newNutritionList);
                    }
                }} />,
            multiplyFloatValues(item['energy_kcal'], ratio),
            multiplyFloatValues(item['carbohydrates_g'], ratio),
            multiplyFloatValues(item['protein_g'], ratio),
            multiplyFloatValues(item['fats_g'], ratio),
        ]

        if (showVitaminsAndMinerals) {

            const vitamins = [...Object.keys(item['vitamins'])];
            vitamins.sort();

            const mineralTexts = [...Object.entries(item['minerals'])].map(([key, value]) =>
                (mineralNameMap[key] ? mineralNameMap[key] : key) + ': ' + value.split(' ').join('')
            );


            resultCells.push(vitamins.join(', '));
            resultCells.push(<>{mineralTexts.map(i => <div key={i} style={{ width: 'max-content' }}>{i}</div>)}</>);
        }

        return resultCells;
    });

    return (
        <div className="App">
            <header className="App-header">
                <Table
                    cellData={cellData}
                    cellKeys={cellKeys}
                    headers={
                        showVitaminsAndMinerals
                            ? headers
                            : headers.slice(0, -2)
                    }
                    selectedRowIndices={selectedRowIndices}
                    selectRow={selectRowCb}
                    sortColumnBy={sortNutritionList}
                />
            </header>
        </div>
    );
}

export default NutritionTable