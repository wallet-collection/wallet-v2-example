import React, {useEffect, useState} from 'react';
import {Card, List, Typography, Tag, Space, Spin} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {getCoinNetworkList} from "../api/auth";

const { Text } = Typography;

const DepositNetworkPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultCoin = queryParams.get('symbol') || ''; // 获取币种参数

    const [lists, setlists] = useState([
        {coin_symbol: '--', network_name: '--', is_recharge: 0, min_recharge: 0},
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
                    is_recharge: item.is_recharge,   //
                    min_recharge: item.min_recharge,   //
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
        navigate('/deposit/address', {
            state: data
        });
    };

    return (
        <div>
            <AppHeader title="选择充值网络" showBack />
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
                                            <Tag color={item.is_recharge === 0 ? 'blue' : 'green'}>
                                                {item.is_recharge === 0 ? '不能充值' : '自动'}
                                            </Tag>
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

export default DepositNetworkPage;