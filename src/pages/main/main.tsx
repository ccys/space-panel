import React from 'react';
import ReactEcharts from "echarts-for-react";
import JSONData from './data.json'
import moment from 'moment'
import 'moment/locale/zh-cn';
import './main.less'
import { Row, Col, Layout } from 'antd'
import { httpPost } from '../../util/http';


export default class MainPanel extends React.PureComponent {
    state: any = {
        type: [],
        status: [],
        room: [],
        level: [],
        life: [],
        center: {},
        now: moment().format('llll'),
        lifeIndex: 0
    }
    timer: any
    lifeCounter: any
    componentDidMount() {
        this.getPageData()
        this.timer = setInterval(() => {
            this.setState({
                now: moment().format('llll')
            })
        }, 1000)
        this.lifeCounter = setInterval(() => {
            if (this.state.life.length <= 1) return
            this.setState({
                lifeIndex: this.state.lifeIndex + 1 >= this.state.life.length ? 0 : this.state.lifeIndex + 1
            })
        }, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    getPageData() {
        httpPost('/getProductCountType').then(center => {
            this.setState({ center })
        })
        httpPost('/getProductListByType').then(type => {
            this.setState({ type })
        })
        httpPost('/getProductListByStatus').then(status => {
            this.setState({ status })
        })
        httpPost('/getProductListByRoom').then(room => {
            this.setState({ room })
        })
        httpPost('/getProductListByLevel').then(level => {
            this.setState({ level })
        })
        httpPost('/getBlubStatus').then(life => {
            this.setState({ life })
        })
    }
    onChartReadyCallback() {

    }
    render() {
        const { now, center, type, status, room, level, life, lifeIndex } = this.state
        return (
            <Layout className='panel-page'>
                <Layout.Header className='header'>
                    <div className='time'>{now}</div>
                    <div className='title'>企业设备大数据平台</div>
                </Layout.Header>
                <Layout.Content className='content'>
                    <Row gutter={32}>
                        <Col span={7}>
                            <div className='chartWrap'>
                                <SectionHead title='类型'></SectionHead>
                                <ReactEcharts
                                    option={getBarOption(type)}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    onChartReady={this.onChartReadyCallback}
                                //   theme={"theme_name"}
                                //   onEvents={EventsDict}
                                //   opts={} 
                                />
                            </div>
                            <div className='chartWrap'>
                                <SectionHead title='状态'></SectionHead>
                                <ReactEcharts
                                    option={getPieOption(status)}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    onChartReady={this.onChartReadyCallback}
                                //   theme={"theme_name"}
                                //   onEvents={EventsDict}
                                //   opts={} 
                                />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className='chartWrap center'>
                                <Row>
                                    <Col span={3}></Col>
                                    <Col span={6}><CenterNum label='设备总数' num={center.counnt} unit='个' /></Col>
                                    <Col span={6}></Col>
                                    <Col span={6}><CenterNum label='设备金额' num={center.amount} unit='万' /></Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={6}><CenterNum label='在保总数' num={center.nowarrantycount} /></Col>
                                    <Col span={10}></Col>
                                    <Col span={6}><CenterNum label='在保金额' num={center.nowarrantyamount} unit='万' /></Col>
                                    <Col span={1}></Col>
                                </Row>
                                <Row>
                                    <Col span={3}></Col>
                                    <Col span={6}><CenterNum label='过保总数' num={center.warrantycount} /></Col>
                                    <Col span={6}></Col>
                                    <Col span={6}><CenterNum label='过保金额' num={center.warrantyamount} unit='万' /></Col>
                                    <Col span={3}></Col>
                                </Row>
                            </div>
                            <div className='chartWrap'>
                                <SectionHead title='易耗品使用统计'></SectionHead>
                                <Row justify='space-between' className='life-legend'>
                                    <Col className='legend warn'></Col>
                                    <Col className='legend error'></Col>
                                    <Col className='legend ok'></Col>
                                </Row>
                                <LifeBars {...life[lifeIndex]} />
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className='chartWrap'>
                                <SectionHead title='位置分布'></SectionHead>
                                <ReactEcharts
                                    option={getBarOption(room)}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    onChartReady={this.onChartReadyCallback}
                                //   theme={"theme_name"}
                                //   onEvents={EventsDict}
                                //   opts={} 
                                />
                            </div>
                            <div className='chartWrap'>
                                <SectionHead title='级别'></SectionHead>
                                <ReactEcharts
                                    option={getPieOption(level)}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    onChartReady={this.onChartReadyCallback}
                                //   theme={"theme_name"}
                                //   onEvents={EventsDict}
                                //   opts={} 
                                />
                            </div>
                        </Col>
                    </Row>
                </Layout.Content>
                <Layout.Footer className='footer'>技术支持： xxxxxxx公司</Layout.Footer>
            </Layout>
        )
    }
}

// 图标区域标题
function SectionHead({ ...props }) {
    return (
        <div className='section-head'>{props.title}</div>
    )
}
// 中心统计数字
function CenterNum({ ...props }) {
    return (
        <div className='center-num'>
            <div className='num-text'>{!!props.num ? props.num + props.unit : '--'}</div>
            <div className='num-label'>{props.label}</div>
        </div>
    )
}

// 易耗品寿命
function LifeBars({ ...props }) {
    return (
        <>
            <LifeBar current={props.blub_one_used} max={props.blub_one_limit} label={'灯泡1'} />
            <LifeBar current={props.blub_two_used} max={props.blub_two_limit} label={'灯泡1'} />
            <div className='life-footer'>{props.pt}</div>
        </>
    )
}

// 寿命显示条
function LifeBar({ ...props }) {
    const percent = props.max > 0 ? props.current / props.max : 0
    let className = 'ok'
    if (percent > 0.4) {
        className = 'warn'
    }
    if (percent > 0.7) {
        className = 'error'
    }
    return (
        <Row gutter={8} align='middle' className='progress-wrap'>
            <Col span={5} className='progress-label'>{props.label}</Col>
            <Col span={12} className='progress'>
                <div className={`${className} progess-bar`} style={{ width: `${percent * 100}%` }}>
                    {percent > 0.15 && <span>{percent * 100}%</span>}
                </div>
            </Col>
            <Col span={6} className='progress-legend'><i className={`${className} legend-icon iconfont icon-warning`}></i>{props.current}/{props.max}</Col>
        </Row>
    )
}

function getPieOption(source: Array<any>) {
    return {
        dataset: {
            source: source.map((each: any) => {
                return {
                    label: `${each.type} ${each.count}`,
                    count: each.count
                }
            })
        },
        legend: {
            type: 'plain',
            orient: 'vertical',
            right: 30,
            top: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        series: {
            type: 'pie',
            radius: ['25%', '55%'],
            center: ['35%', '50%'],
            height: 200,
            top: 'center'
        }
    }
}
function getBarOption(source: any) {
    return {
        xAxis: {
            axisTick: false,
            axisLine: {
                lineStyle: {
                    opacity: 0.3,
                    color: 'white',
                }
            },
            type: 'category',
        },
        yAxis: {
            name: '数量',
            axisTick: false,
            axisLine: {
                lineStyle: {
                    opacity: 0.3,
                    color: 'white'
                }
            },
            splitLine: {
                lineStyle: {
                    opacity: 0.3,
                    type: 'dotted'
                }
            }
        },
        dataset: {
            source: source
        },
        series: {
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                color: 'white'
            },
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#15AEFC' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0763FF' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            barWidth: 15
        }
    }
}
