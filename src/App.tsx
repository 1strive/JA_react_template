import React, { useState, useEffect } from 'react'
import styles from './index.less'
import { Button, Space } from 'antd-mobile'
import { Badge, TabBar } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
interface oJ {
    m: number,
    l: string
}
function App() {
    const [activeKey, setActiveKey] = useState('todo')
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: 'todo',
            title: '待办',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: 'message',
            title: '消息',
            icon: (active: boolean) =>
                active ? <MessageFill /> : <MessageOutline />,
            badge: '99+',
        },
        {
            key: 'personalCenter',
            title: '我的',
            icon: <UserOutline />,
        },
    ]
    return (
        <div>
            <Button color='primary' fill='solid'>123</Button>
            <div className={styles['ja']}>123</div>
        </div>
    )
}
export default App
