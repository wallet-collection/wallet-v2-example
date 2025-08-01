import React from 'react';
import { Input, Card, Avatar, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const { Text } = Typography;

const coinData = [
    {
        id: 'BTC',
        name: 'Bitcoin',
        icon: '/icons/btc.png', // 直接使用图片路径
        balance: '0.25 BTC',
    },
    {
        id: 'ETH',
        name: 'Ethereum',
        icon: '/icons/eth.png',
        balance: '5.0 ETH',
    },
    {
        id: 'USDT',
        name: 'Tether',
        icon: '/icons/usdt.png',
        balance: '500 USDT',
    },
];

const DepositCoinPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AppHeader title="选择充值币种" showBack />
            <Input
                placeholder="搜索币种"
                style={{ margin: '16px 0', borderRadius: '20px' }}
            />
            <List
                dataSource={coinData}
                renderItem={(item) => (
                    <Card
                        hoverable
                        style={{ marginBottom: '8px', borderRadius: '8px' }}
                        onClick={() => navigate('/deposit/network')}
                    >
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.icon} size="large" />} // 使用图片作为头像
                                title={<Text strong>{item.name}</Text>}
                                description={<Text type="secondary">{item.id}</Text>}
                            />
                            <Text>{item.balance}</Text>
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};

export default DepositCoinPage;