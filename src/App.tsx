import React from 'react'
import styles from './index.less'
interface oJ {
    m: number,
    l: string
}
function App() {
    const m: any = 3
    const obj: oJ = {
        m: 3,
        l: 's',
    }
    return (
        <div className={styles.ja}>123</div>
        // <div className={styles['ja']}>123</div>
        // <div className='ja'>12333</div>
    )
}
export default App
