import React from 'react';
import ReactEcharts from "echarts-for-react";
import JSONData from './data.json'
import moment from 'moment'
import 'moment/locale/zh-cn';
import './main.less'
import { Row, Col, Layout } from 'antd'

export default class MainPanel extends React.PureComponent {
    state = {
        type: [],
        now: moment().format('llll')
    }
    timer: any
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                type: JSONData.type
            })
        }, 500);
        this.timer = setInterval(() => {
            this.setState({
                now: moment().format('llll')
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    getBarOption() {
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
                    lineStyle:{
                        opacity: 0.3,
                        type:'dotted'
                    }
                }
            },
            dataset: {
                source: JSONData.type
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
    getPieOption() {
        return {
            dataset: {
                source: JSONData.type
            },
            series: {
                type: 'pie'
            }
        }
    }
    getProgressOption() {
        return {
            grid: {
                containLabel: true
            },
            xAxis: {
                max: (value: any) => {
                    return value.max;
                },
                type: 'value',
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false }
            },
            yAxis: {
                type: 'category',
                axisTick: { show: false },
                axisLine: { show: false },
            },
            dataset: {
                source: JSONData.life
            },
            series: {
                type: 'bar'
            }
        }
    }
    onChartReadyCallback() {

    }
    render() {
        const { now } = this.state
        return (
            <Layout className='panel-page'>
                <Layout.Header className='header'>
                    <div className='time'>{now}</div>
                    <div className='title'>企业设备大数据平台</div>
                </Layout.Header>
                <Layout.Content className='content'>
                    <Row gutter={32}>
                        <Col span={8}>
                            <div className='chartWrap'>
                                <SectionHead title='类型'></SectionHead>
                                <ReactEcharts
                                    option={this.getBarOption()}
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
                                    option={this.getPieOption()}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    onChartReady={this.onChartReadyCallback}
                                //   theme={"theme_name"}
                                //   onEvents={EventsDict}
                                //   opts={} 
                                />
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='chartWrap center'>
                                <Row>
                                    <Col span={3}></Col>
                                    <Col span={6}><CenterNum label='设备数' num='1221' /></Col>
                                    <Col span={6}></Col>
                                    <Col span={6}><CenterNum label='设备数' num='1221' /></Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={6}><CenterNum label='设备数' num='1221' /></Col>
                                    <Col span={10}></Col>
                                    <Col span={6}><CenterNum label='设备数' num='1221' /></Col>
                                    <Col span={1}></Col>
                                </Row>
                                <Row>
                                    <Col span={3}></Col>
                                    <Col span={6}><CenterNum label='设备数' num='1221' /></Col>
                                    <Col span={6}></Col>
                                    <Col span={6}><CenterNum label='设备数' num='1221' /></Col>
                                    <Col span={3}></Col>
                                </Row>
                            </div>
                            <div className='chartWrap'>
                                <SectionHead title='易耗品使用统计'></SectionHead>
                                <ReactEcharts
                                    option={this.getProgressOption()}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    onChartReady={this.onChartReadyCallback}
                                //   theme={"theme_name"}
                                //   onEvents={EventsDict}
                                //   opts={} 
                                />
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='chartWrap'>
                                <SectionHead title='位置分布'></SectionHead>
                                <ReactEcharts
                                    option={this.getBarOption()}
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
                                    option={this.getPieOption()}
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
            <div className='num-text'>{props.num}</div>
            <div className='num-label'>{props.label}</div>
        </div>
    )
}