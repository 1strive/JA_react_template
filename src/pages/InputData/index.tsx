import React, { useState, useCallback } from 'react';
import styles from './index.less'
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    NavBar,
    List,
    Toast
} from 'antd-mobile'
import { FormInstance } from 'antd-mobile/es/components/form'
import moment from 'moment'
import { ListItem } from 'antd-mobile/es/components/list/list-item';
export default function () {
    const navigate = useNavigate();
    const [data, setData] = useState<any>([])
    const singleDate: Date = new Date('2023-06-03')
    const back = () => {
        navigate(-1)
    }
    const finish = (data: any) => {
        console.log(data, 'jad');
        const { newGlucose, weight } = data
        navigate(`/home?newGlucose=${newGlucose}&weight=${weight}`)
    }
    const save = (val: any) => {
        data.push(val)
        if (data.length > 10) {
            Toast.show({
                content: '已累计十条数据，请先提交',
            })
            return
        }
        setData([...data])
    }

    return (
        <div className={styles['wrapper']}>
            <NavBar onBack={back}>血糖值记录</NavBar>
            {data.length ? <List>
                {data?.map((i: any) => {
                    console.log(i, 'jai');
                    return <ListItem>
                        血糖值:{i?.newGlucose} ; 时间：{i?.time}
                    </ListItem>
                })}
            </List> : null}
            <Form
                style={{ marginTop: '5px' }}
                layout='horizontal'
                onFinish={save}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button block type='submit' color='primary' size='large' className={styles['save-btn']}>
                            保存
                        </Button>
                        <Button block type='button' color='primary' size='large' className={styles['save-btn']}
                            onClick={() => {

                                finish(data)
                            }}
                        >
                            提交
                        </Button>
                    </div>
                }
            >
                <Form.Item
                    name='newGlucose'
                    label='血糖'
                    help='血糖'
                    rules={[{ required: true, message: '血糖不能为空' }]}
                >
                    <Input type='number' min={50} max={150} placeholder='请输入血糖' />
                </Form.Item>
                <Form.Item
                    name='time'
                    label='时间'
                    help='时间'
                    rules={[{ required: true, message: '时间' }]}
                >
                    <Input type='number' placeholder='时间' />
                </Form.Item>
            </Form>

        </div >
    )
}