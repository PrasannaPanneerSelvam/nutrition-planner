import { useRef, useState } from 'react';
import styles from './css/editable.module.css'

function Editable({ initialValue, unit, onValueChange = () => { } }) {

    const [existingValue, setExistingValue] = useState(initialValue);
    const [showEdit, setShowEdit] = useState(false);
    const inputRef = useRef();

    return (
        <div className={styles.container} onClick={(e) => {
            e.stopPropagation();
        }}>
            <div className={showEdit ? styles.hide : ''}>
                <img className={styles.square} onClick={() => {
                    inputRef.current.value = existingValue;
                    setShowEdit(true);
                }} />

                <span>{existingValue}</span>
                {unit && <span>{unit}</span>}
            </div>
            <div className={showEdit ? '' : styles.hide}>
                <input type="number" ref={inputRef} />
                {unit && <span>{unit}</span>}
                <span className={[styles.square, styles.close].join(" ")} onClick={() => {
                    setShowEdit(false);
                }}></span>
                <span className={styles.square} onClick={() => {
                    setExistingValue(inputRef.current.value);
                    onValueChange(inputRef.current.value);
                    setShowEdit(false);
                }}></span>
            </div>

        </div>
    )
}

export default Editable;