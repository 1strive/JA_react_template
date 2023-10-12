import React, { useState } from 'react';
import styles from './index.less'
import { Card, Toast, Button, NavBar } from 'antd-mobile'


export default function () {
    const onClick = () => {
        Toast.show('点击了卡片')
    }
    return (
        <>
            <div className={styles.top}>
                <NavBar>Test</NavBar>
            </div>
            <Card title='卡片标题' onClick={onClick}>
                卡片内容
            </Card>
        </>
    )
}