import React, { useEffect, useState } from 'react';
import styles from './index.less'
import { Card, Toast, SpinLoading, JumboTabs, Divider, CapsuleTabs } from 'antd-mobile'
import { AddCircleOutline, EditSFill } from 'antd-mobile-icons';
import { Chart, Axis, Geom, Tooltip, Guide } from 'bizgoblin';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment'
export default function () {
    const navigate = useNavigate();
    const params: any = useLocation();
    const sugarRate = 0.8
    const sugarTargetLow = 4.4
    const sugarTargetHigh = 7.8
    const girth = 2 * Math.PI * 50
    const dasharray = `${sugarRate * girth} ${girth}`
    const d = " M 100, 50 A 50, 50, 0, 0, 1, 100, 150 A 50, 50, 0, 0, 1, 100, 50"
    console.log(params, 'jap');

    const [showTime, setShowTime] = useState([])
    const [showData, setShowData] = useState([])
    const [showArr, setShowArr] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getData = async () => {
        try {
            const obj: any = {}
            params?.search?.split('?')[1]?.split('&')?.forEach((i: any) => {
                const key = i.split('=')[0]
                const val = i.split('=')[1]
                obj[key] = key === 'newGlucose' ? val.split(',') : val
            })
            const { newGlucose = [] } = obj

            const tmp = await fetch("http://8.134.86.162:8080/predict/predictAfterEat",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newGlucose,
                        weight: ''
                    })
                }
            )
            const res = JSON.parse(await tmp.text())
            const { result } = res
            const showArr = result.slice(-20).map((i: any) => {
                i.time = moment(i.time).format('HH:mm:ss')
                return {
                    date: i.time,
                    value: i.predictValue
                }
            })
            const timeArr = showArr.map((i: any) => {
                return i.time
            })
            const dataArr = showArr.map((i: any) => {
                return i.predictValue
            })
            console.log(showArr, 'jar');
            setShowArr(showArr)
            setShowTime(timeArr)
            setShowData(dataArr)
            setIsLoading(false)
        } catch (error) {
            console.log(error, 'jae');
        }
    }

    useEffect(() => {
        console.log(moment(1703432950000).format('HH:MM'), 'JAWEEW');
        getData()
    }, [])

    const dataInput = () => {
        navigate('/dataInput')
    }
    const defs = [
        {
            dataKey: 'value',
            tickCount: 5,
            min: 0,
            formatter: (val: any) => {
                return Math.round(val * 100) / 100
            }
        },
        {
            dataKey: 'date',
            tickCount: 5,
        },
    ];

    const onShowTooltip = (i: any) => {
        const { items } = i
        items[0].title = `时间：${items[0].origin.date}`
        items[0].name = '血糖值'
        items[0].value = items[0].origin.value
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
                            </div>
                        </div>
                        <div className={styles['target']}>{`控糖目标:${sugarTargetLow}~${sugarTargetHigh}mmol/L`}<EditSFill color='blue' fontSize={'16px'} /></div>
                        <Divider></Divider>
                        <CapsuleTabs>
                            <CapsuleTabs.Tab title='血糖' key='fruits'>.
                                <div style={{
                                    position: 'relative',
                                    height: '300px',
                                    width: '90vw'
                                }}>
                                    {isLoading ?
                                        <div className={styles['loading']}> <SpinLoading style={{ '--size': '48px' }} /> </div>
                                        :
                                        // TODO:拖拽
                                        <Chart
                                            width="100%"
                                            height="100%"
                                            data={showArr}
                                            defs={defs}
                                            padding={[45, 45, 50, 65]}
                                        >
                                            <Axis dataKey="date" />
                                            <Axis dataKey="value" />
                                            <Geom geom="path" position="date*value" />
                                            <Tooltip onShow={onShowTooltip} showTitle={true} />
                                            <Guide
                                                type='text'
                                                top={true}
                                                position={['median', 'max']}
                                                offsetY={240}
                                                content={'时间'}
                                                style={{
                                                    fill: '#999',
                                                    fontSize: 12
                                                }}
                                            >
                                            </Guide>
                                            <Guide
                                                type='text'
                                                top={true}
                                                position={['min', 'max']}
                                                offsetX={-50}
                                                offsetY={90}
                                                content={'血\n糖\n值'}
                                                style={{
                                                    fill: '#999',
                                                    fontSize: 12
                                                }}
                                            >
                                            </Guide>
                                        </Chart>
                                    }
                                </div>
                            </CapsuleTabs.Tab>
                            <CapsuleTabs.Tab title='注射记录' key='vegetables'>
                                注射记录
                            </CapsuleTabs.Tab>
                            <CapsuleTabs.Tab title='建议' key='animals'>
                                建议
                            </CapsuleTabs.Tab>
                        </CapsuleTabs>
                    </JumboTabs.Tab>
                    <JumboTabs.Tab title='尿酸' description='' key='uric'>
                        尿酸
                    </JumboTabs.Tab>
                </JumboTabs>
            </div >
        </div>
    )
}

