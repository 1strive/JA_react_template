import React, { useState } from 'react';
import styles from './index.less'
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    NavBar,
    CalendarPicker
} from 'antd-mobile'
import moment from 'moment'
export default function () {
    const navigate = useNavigate();
    // const form = useForm()
    const back = () => {
        navigate(-1)
    }
    const finish = (data: any) => {
        console.log(data, 'jad');
        const { newGlucose, weight } = data
        navigate(`/home?newGlucose=${newGlucose}&weight=${weight}`)
    }
    const [visible1, setVisible1] = useState(false)
    const [time, setTime] = useState(null)
    const singleDate: Date = new Date('2023-06-03')

    return (
        <div className={styles['wrapper']}>
            <NavBar onBack={back}>血糖值记录</NavBar>
            <Form
                layout='horizontal'
                onFinish={finish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        保存
                    </Button>
                }
            >
                <Form.Header>血糖值记录</Form.Header>
                <Form.Item
                    name='newGlucose'
                    label='血糖'
                    help='血糖'
                    rules={[{ required: true, message: '血糖不能为空' }]}
                >
                    <Input type='number' min={50} max={150} placeholder='请输入血糖' />
                </Form.Item>
                <Form.Item
                    name='newGlucose'
                    label='时间'
                    help='时间'
                    rules={[{ required: true, message: '时间' }]}
                >
                    {/* {time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : "选择单个日期"} */}
                    <Input value={time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : ""}></Input>
                    <div onClick={() => {
                        setVisible1(true)
                    }}>选择日期</div>
                    <CalendarPicker
                        visible={visible1}
                        selectionMode='single'
                        defaultValue={singleDate}
                        onClose={() => setVisible1(false)}
                        onMaskClick={() => setVisible1(false)}
                        onConfirm={(val: any) => {
                            console.log(val, 'jav');
                            // form.s
                            setTime(val)
                        }}
                    />
                </Form.Item>
            </Form>

        </div >
    )
}