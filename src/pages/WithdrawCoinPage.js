import React from 'react';
import { Input, Card, List, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const { Text } = Typography;

// 币种数据（图片放在 public/icons/）
const coinData = [
    {
        id: 'BTC',
        name: 'Bitcoin',
        icon: '/icons/btc.png',
        balance: '0.25 BTC',
        value: '$15,000'
    },
    {
        id: 'ETH',
        name: 'Ethereum',
        icon: '/icons/eth.png',
        balance: '5.0 ETH',
        value: '$2,500'
    },
    {
        id: 'USDT',
        name: 'Tether',
        icon: '/icons/usdt.png',
        balance: '500 USDT',
        value: '$500'
    }
];

const WithdrawCoinPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AppHeader title="选择提币币种" showBack />

            {/* 搜索框 */}
            <Input
                placeholder="搜索币种"
                style={{
                    margin: '16px 0',
                    borderRadius: 20,
                    padding: '8px 16px'
                }}
            />

            {/* 币种列表 */}
            <List
                dataSource={coinData}
                renderItem={(item) => (
                    <Card
                        hoverable
                        style={{
                            marginBottom: 12,
                            borderRadius: 8,
                            border: '1px solid #f0f0f0'
                        }}
                        onClick={() => navigate('/withdraw/network')}
                    >
                        <List.Item>
                            <List.Item.Meta
                                avatar={<img src={item.icon} alt={item.name} style={{ width: 32, height: 32 }} />}
                                title={<Text strong>{item.name}</Text>}
                                description={<Text type="secondary">{item.id}</Text>}
                            />
                            <Space direction="vertical" align="end">
                                <Text>{item.balance}</Text>
                                <Text type="secondary">{item.value}</Text>
                            </Space>
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};

export default WithdrawCoinPage;