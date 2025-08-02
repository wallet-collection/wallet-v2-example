import React, {useEffect, useState} from 'react';
import {Input, Card, Avatar, List, Typography, Spin} from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {getCoinList} from '../api/auth';

const { Text } = Typography;

const DepositCoinPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [balances, setBalances] = useState([
        {coin_icon: '', coin_symbol: '--', coin_name: '--', balance: 0, usdt_price: 0},
    ]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 并行获取用户信息和币种列表
                const [coinData] = await Promise.all([
                    getCoinList() // 新增接口调用
                ]);
                setBalances(coinData.data.map(item => ({
                    coin_icon: item.coin_icon,      // 假设接口返回symbol字段
                    coin_symbol: item.coin_symbol,      // 假设接口返回symbol字段
                    coin_name: item.coin_name,      // 假设接口返回symbol字段
                    balance: item.balance,   // 余额
                    usdt_price: item.usdt_price    // 美元估值
                })));
            } catch (error) {
                console.error('获取信息失败:');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <AppHeader title="选择充值币种" showBack />
            <Input
                placeholder="搜索币种"
                style={{ margin: '16px 0', borderRadius: '20px' }}
            />
            <Spin spinning={loading}>
                <List
                    dataSource={balances}
                    renderItem={(item) => (
                        <Card
                            hoverable
                            style={{ marginBottom: '8px', borderRadius: '8px' }}
                            onClick={() => navigate(`/deposit/network?symbol=${item.coin_symbol}`)}
                        >
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.coin_icon} size="large" />} // 使用图片作为头像
                                    title={<Text strong>{item.coin_name}</Text>}
                                    description={<Text type="secondary">{item.coin_symbol}</Text>}
                                />
                                <Text>{item.balance}</Text>
                            </List.Item>
                        </Card>
                    )}
                />
            </Spin>
        </div>
    );
};

export default DepositCoinPage;