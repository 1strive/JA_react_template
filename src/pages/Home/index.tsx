import React, { useEffect, useState } from 'react';
import styles from './index.less'
import { Card, Toast, Button, JumboTabs, Divider, CapsuleTabs } from 'antd-mobile'
import { AddCircleOutline, EditSFill } from 'antd-mobile-icons';
import ReactEcharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
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
    const [showTime, setShowTime] = useState([])
    const [showData, setShowData] = useState([])
    const getData = async () => {
        try {
            const tmp = await fetch("http://8.134.86.162:8080/predict/")
            const res = JSON.parse(await tmp.text())
            const { result } = res
            const showArr = result.slice(-20).map((i: any) => {
                i.time = moment(i.time).format('HH:MM')
                return i
            })
            const timeArr = showArr.map((i: any) => {
                return i.time
            })
            const dataArr = showArr.map((i: any) => {
                return i.predictValue
            })
            console.log(showArr, 'jar');
            setShowTime(timeArr)
            setShowData(dataArr)
        } catch (error) {
            console.log(error, 'jae');
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const op = {
        xAxis: {
            type: 'category',
            data: showTime
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: showData,
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