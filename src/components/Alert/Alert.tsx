import { ReactNode } from "react";
import styles from './Alert.module.css'

export default function Alert({children}: {children: ReactNode}) {
  return (
    <p className={styles.alert}>
        {children}
    </p>
  )
}
