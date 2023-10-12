import React, { useState } from 'react';
import styles from './index.less'
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    NavBar,
    TextArea,
    DatePicker,
    Selector,
    Slider,
    Stepper,
    Switch,
} from 'antd-mobile'
export default function () {
    const navigate = useNavigate();
    const back = () => {
        navigate(-1)
    }
    return (
        <div className={styles['wrapper']}>
            <NavBar onBack={back}>数据输入</NavBar>
            <Form
                layout='horizontal'
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        保存
                    </Button>
                }
            >
                <Form.Header>数据提交</Form.Header>
                <Form.Item
                    name='suger'
                    label='血糖'
                    rules={[{ required: true, message: '血糖不能为空' }]}
                >
                    <Input onChange={console.log} placeholder='请输入血糖' />
                </Form.Item>
                <Form.Item name='address' label='时间' help='详细'>
                    <Input
                        placeholder='请输入时间'
                    />
                </Form.Item>
                <Form.Item name='amount' label='用药' childElementPosition='right'>
                    <Stepper />
                </Form.Item>
                <Form.Item
                    name='delivery'
                    label='饮食'
                    childElementPosition='right'
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    name='text'
                    label='备注'
                >
                    <TextArea placeholder='请输入备注信息'/>
                </Form.Item>
            </Form>

        </div>
    )
}