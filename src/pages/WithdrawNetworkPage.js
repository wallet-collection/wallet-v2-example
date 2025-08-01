import React from 'react';
import { Card, List, Tag, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const { Text } = Typography;

// 网络数据（图片放在 public/icons/）
const networkData = [
    {
        id: 'BTC',
        name: 'Bitcoin Network',
        icon: '/icons/btc_network.png',
        fee: '0.0005 BTC',
        speed: '快',
        time: '约10分钟'
    },
    {
        id: 'ERC20',
        name: 'Ethereum (ERC-20)',
        icon: '/icons/erc20.png',
        fee: '0.001 ETH',
        speed: '中',
        time: '约5分钟'
    },
    {
        id: 'TRC20',
        name: 'Tron (TRC-20)',
        icon: '/icons/trc20.png',
        fee: '1 USDT',
        speed: '快',
        time: '约2分钟'
    }
];

const WithdrawNetworkPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AppHeader title="选择提币网络" showBack />

            <List
                dataSource={networkData}
                renderItem={(item) => (
                    <Card
                        hoverable
                        style={{
                            marginBottom: 12,
                            borderRadius: 8,
                            border: '1px solid #f0f0f0'
                        }}
                        onClick={() => navigate('/withdraw/form')}
                    >
                        <List.Item>
                            <List.Item.Meta
                                avatar={<img src={item.icon} alt={item.name} style={{ width: 32, height: 32 }} />}
                                title={
                                    <Space>
                                        <Text strong>{item.name}</Text>
                                        <Tag color={item.speed === '快' ? 'green' : 'blue'}>
                                            {item.speed}
                                        </Tag>
                                    </Space>
                                }
                                description={
                                    <Space direction="vertical" size={2}>
                                        <Text type="secondary">手续费: {item.fee}</Text>
                                        <Text type="secondary">到账时间: {item.time}</Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};

export default WithdrawNetworkPage;