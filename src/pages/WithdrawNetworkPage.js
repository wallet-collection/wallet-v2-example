import React, {useEffect, useState} from 'react';
import {Card, List, Typography, Tag, Space, Spin} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {getCoinNetworkList} from "../api/auth";

const { Text } = Typography;

const WithdrawNetworkPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultCoin = queryParams.get('symbol') || ''; // 获取币种参数

    const [lists, setlists] = useState([
        {coin_symbol: '--', network_name: '--', is_withdraw: 0, min_recharge: 0},
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 并行获取用户信息和币种列表
                const coinData = await getCoinNetworkList({coin_symbol: defaultCoin})
                setlists(coinData.data.map(item => ({
                    coin_symbol: item.coin_symbol,      // 假设接口返回symbol字段
                    network_name: item.network_name,      // 假设接口返回symbol字段
                    is_withdraw: item.is_withdraw,   //
                    withdraw_rate: item.withdraw_rate,   //
                    min_withdraw_fee: item.min_withdraw_fee,   //
                    min_withdraw: item.min_withdraw,   //
                    max_withdraw: item.max_withdraw,   //
                })));
            } catch (error) {
                console.error('获取信息失败:');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleSelectCoin = (data) => {
        navigate('/withdraw/form', {
            state: data
        });
    };

    return (
        <div>
            <AppHeader title="选择提币网络" showBack />
            <Spin spinning={loading}>
                <List
                    dataSource={lists}
                    renderItem={(item) => (
                        <Card
                            hoverable
                            style={{
                                marginBottom: 12,
                                borderRadius: 8,
                                border: '1px solid #f0f0f0',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                            }}
                            onClick={() => handleSelectCoin(item)}
                        >
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Space>
                                            <Text strong>{item.network_name}</Text>
                                            <Tag color={item.is_withdraw === 0 ? 'blue' : 'green'}>
                                                {item.is_withdraw === 0 ? '不能充值' : '自动'}
                                            </Tag>
                                        </Space>
                                    }
                                    description={
                                        <Space direction="vertical" size={2}>
                                            <Text type="secondary">手续费率: {item.withdraw_rate*100}%</Text>
                                            <Text type="secondary">最低提现: {item.min_withdraw}</Text>
                                            <Text type="secondary">最大提现: {item.max_withdraw}</Text>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        </Card>
                    )}
                />
            </Spin>
        </div>
    );
};

export default WithdrawNetworkPage;