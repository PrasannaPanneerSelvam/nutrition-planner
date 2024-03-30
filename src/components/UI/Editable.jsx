import { useRef, useState } from 'react';
import styles from './css/editable.module.css'
import ReactDOM from 'react-dom';

function InputPopup({ initialValue, closePopupCb, unit }) {
    const [inputValue, setInputValue] = useState(initialValue);
    const inputRef = useRef();

    const handleFocus = (event) => {
        console.log("T")
        const target = event.currentTarget;
        target.type = 'text';
        target.setSelectionRange(0, target.value.length);
        target.type = 'number';
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={(e) => {
            e.stopPropagation()
            closePopupCb(null)
        }}>
            <div className={styles.popupWrapper} onClick={(e) => { e.stopPropagation() }}>
                <div>
                    <h5>Enter your desired value</h5>
                    <div>
                        <input
                            type="number"
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            onFocus={handleFocus}
                        />
                        {unit && <span style={{ marginLeft: '5px' }}>{unit}</span>}
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={[styles.button, styles.close].join(" ")} onClick={() => closePopupCb(null)}>Cancel</button>
                        <button className={styles.button} onClick={() => {
                            closePopupCb(inputValue);
                        }}>Set</button>
                    </div>
                </div>
            </div>
        </ div>,
        document.getElementById('PopupHolder')
    );
}


function Editable({ initialValue, unit, onValueChange = () => { } }) {
    const [existingValue, setExistingValue] = useState(initialValue);
    const [showEdit, setShowEdit] = useState(false);

    return (
        <>
            <div className={styles.previewWrapper} onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className={styles.edit}
                    style={{
                        visibility: showEdit ? 'hidden' : 'visible'
                    }}
                    onClick={() => {
                        setShowEdit(true);
                    }}>
                    <svg
                        fill='#fff'
                        height='100%'
                        width='100%'
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                        <path
                            d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                    </svg>
                </div>

                <div>
                    <span>{showEdit ? '...' : existingValue}</span>
                    {!showEdit && unit && <span>{unit}</span>}
                </div>
            </div>

            {showEdit &&
                <InputPopup
                    initialValue={existingValue}
                    closePopupCb={(newValue) => {
                        if (newValue !== null) {
                            onValueChange(newValue);
                            setExistingValue(newValue);
                        }
                        setShowEdit(false)
                    }}
                    unit={unit}
                />
            }
        </>
    )
}

export default Editable;