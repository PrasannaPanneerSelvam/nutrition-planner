import React from 'react';
import styles from './css/table.module.css'

function Table({
    cellData,
    cellKeys,
    headers,
    selectedRowIndices,
    selectRow,
    sortColumnBy,
}) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {headers.map((i, idx) => <th key={i} onClick={() => {
                        sortColumnBy(cellKeys[idx]);
                    }}>{i}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    cellData.map((singleRow, rowIdx) =>
                    (<tr key={`cellRow-${rowIdx}-${JSON.stringify(singleRow[0])}`} onClick={() => selectRow(rowIdx)} className={
                        selectedRowIndices.includes(rowIdx) ? styles.selected : ''
                    }>
                        {
                            singleRow.map((cellData, colIdx) =>
                                (<td key={`cell-${rowIdx}-${colIdx}`}>{cellData}</td>)
                            )
                        }
                    </tr>)
                    )
                }
            </tbody>
        </table >
    )
}

export default Table