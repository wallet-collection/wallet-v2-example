import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Card, Form, Input, Button, Select, Space, Typography, message, Spin} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import AppHeader from '../components/AppHeader';
import {getMemberCoinInfo, withdraw} from "../api/auth";

const { Text } = Typography;

const WithdrawFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // 初始化导航函数
    const { coin_symbol, network_name, is_withdraw, withdraw_rate, min_withdraw_fee, min_withdraw, max_withdraw } = location.state || {};

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('提币提交:', values);
        // 这里调用API提交提币请求
        try {
            setLoading(true);
            // 根据当前tab决定调用登录还是注册接口
            const response = await withdraw({
                network_name: network_name,
                coin_symbol: coin_symbol,
                address: values.address,
                amount: values.amount,
            })

            // 存储token并跳转
            if (response.code > 0) {
                messageApi.error(response.message);
                return
            }
            messageApi.success(`提币成功`);
            setTimeout(() => {
                navigate('/orders');
            }, 1000)
        } catch (error) {
            messageApi.error(error.response?.data?.message || '操作失败');
        } finally {
            setLoading(false);
        }
    };

    const [loading, setLoading] = useState(true);

    const [coinInfo, setCoinInfo] = useState({
        balance: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 并行获取用户信息和币种列表
                const res = await getMemberCoinInfo({coin_symbol: coin_symbol}) // 新增接口调
                if (res.code > 0) {
                    messageApi.warning(res.message)
                    return
                }
                setCoinInfo(res.data);
            } catch (error) {
                console.error('获取信息失败:');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 粘贴功能实现
    const handlePaste = async () => {
        try {
            // 现代API（推荐）
            if (navigator.clipboard?.readText) {
                const text = await navigator.clipboard.readText();
                form.setFieldsValue({
                    address: text // 字段名必须与Form.Item的name一致
                });
                messageApi.success('已粘贴剪贴板内容');
                return;
            }

            // 兼容方案（需要用户手势）
            const textarea = document.createElement('textarea');
            textarea.style.position = 'fixed';
            textarea.style.opacity = 0;
            document.body.appendChild(textarea);
            textarea.focus();

            const success = document.execCommand('paste');
            if (success) {
                form.setFieldsValue({
                    address: textarea.value // 字段名必须与Form.Item的name一致
                });
                messageApi.success('已粘贴');
            } else {
                messageApi.warning('请使用 Ctrl+V 手动粘贴');
            }
            document.body.removeChild(textarea);
        } catch (err) {
            messageApi.error('粘贴失败: ' + err.message);
            console.error('粘贴错误:', err);
        }
    }

    return (
        <>
            {contextHolder}
            <div>
                <AppHeader title={`提币 ${coin_symbol}(${network_name})`} showBack />
                <Spin spinning={loading}>
                    <Card>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name="coin" label="币种" initialValue={coin_symbol}>
                                <Select disabled style={{ width: '100%' }}>
                                    <Select.Option value={coin_symbol}>{coin_symbol}</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="network" label="网络" initialValue={network_name}>
                                <Select disabled style={{ width: '100%' }}>
                                    <Select.Option value={network_name}>{network_name}</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="提币地址（一定要做地址检查，不然会被短地址攻击）"
                                rules={[{ required: true, message: '请输入地址!' }]}
                            >
                                <Input
                                    placeholder="0x..."
                                    suffix={<Button onClick={handlePaste} icon={<CopyOutlined />} type="text" />}
                                />
                            </Form.Item>

                            <Form.Item
                                name="amount"
                                label="数量"
                                rules={[
                                    { required: true, message: '请输入数量!' },
                                    { max: Number(coinInfo.balance), message: '超过可用余额!' },
                                    { max: Number(max_withdraw), message: '超过最大提现!' },
                                ]}
                            >
                                <Input type="number" placeholder="0.1" addonAfter={coin_symbol} />
                            </Form.Item>

                            <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
                                <Text type="secondary">可用余额: {coinInfo.balance} {coin_symbol}</Text>
                                <Text type="secondary">网络手续费率: {withdraw_rate*100}%</Text>
                                <Text strong>实际到账: 请自行计算</Text>
                            </Space>

                            <Button type="primary" htmlType="submit" block>
                                提交提币
                            </Button>
                        </Form>
                    </Card>
                </Spin>
            </div>
        </>
    );
};

export default WithdrawFormPage;