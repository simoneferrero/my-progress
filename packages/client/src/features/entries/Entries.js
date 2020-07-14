import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getEntries,
  selectEntries
} from './entriesSlice';
import styles from './Entries.module.css';

export function Entries() {
  const entries = useSelector(selectEntries);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(getEntries())
          }
        >
          Get Entries
        </button>
      </div>
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </div>
  );
}
