import React, { useState } from 'react';
import styles from './index.less'
import { Card, Toast, Button, JumboTabs, Divider, CapsuleTabs } from 'antd-mobile'
import { AddCircleOutline, EditSFill } from 'antd-mobile-icons';
import ReactEcharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
export default function () {
    const navigate = useNavigate();
    const sugarRate = 0.3
    const sugarTargetLow = 4.4
    const sugarTargetHigh = 7.8
    const girth = 2 * Math.PI * 50
    const dasharray = `${sugarRate * girth} ${girth}`
    const d = " M 100, 50 A 50, 50, 0, 0, 1, 100, 150 A 50, 50, 0, 0, 1, 100, 50"
    const onClick = () => {
        Toast.show('点击了卡片')
    }
    const op = {
        xAxis: {
            type: 'category',
            data: ['0', '1', '2', '3', '4', '5', '6']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    }

    const dataInput = () => {
        navigate('/dataInput')
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles.top}>
                <JumboTabs>
                    <JumboTabs.Tab title='血糖' description='' key='sugar'>
                        <div className={styles['progress']} >
                            <svg width="200" height="200">
                                <circle fill="none" cx="100" cy="100" r="50" stroke="#EBEDF0" stroke-width="10" />
                                <path fill="none" d={d} stroke="#50D4AB" stroke-width="10" stroke-dasharray={dasharray} />
                            </svg>
                            <div className={styles['center']}>
                                <p style={{ marginBottom: '3px' }}> {sugarRate * 100}%</p>
                                <div onClick={dataInput}> <AddCircleOutline fontSize={28} /></div>
                                {/* TODO:此处给出推荐值 */}
                            </div>
                        </div>
                        <div className={styles['target']}>{`控糖目标:${sugarTargetLow}~${sugarTargetHigh}mmol/L`}<EditSFill color='blue' fontSize={'16px'} /></div>
                    </JumboTabs.Tab>
                    <JumboTabs.Tab title='尿酸' description='' key='uric'>
                        尿酸
                    </JumboTabs.Tab>
                </JumboTabs>
                <Divider></Divider>
                <CapsuleTabs>
                    <CapsuleTabs.Tab title='血糖' key='fruits'>
                        <ReactEcharts option={op} style={{ height: '300px' }} />
                    </CapsuleTabs.Tab>
                    <CapsuleTabs.Tab title='注射记录' key='vegetables'>
                        <ReactEcharts option={op} style={{ height: '300px' }} />
                    </CapsuleTabs.Tab>
                    <CapsuleTabs.Tab title='建议' key='animals'>
                        建议
                    </CapsuleTabs.Tab>
                </CapsuleTabs>
            </div >
        </div>
    )
}