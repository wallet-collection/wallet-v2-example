import React from 'react';
import { Card, List, Typography, Tag, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const { Text } = Typography;

// 网络数据（假设图片已放在 public/icons/ 目录下）
const networkData = [
    {
        id: 'BTC',
        name: 'Bitcoin Network',
        icon: '/icons/btc_network.png', // 本地图片路径
        fee: '0.0005 BTC',
        speed: '快',
        description: '原生比特币网络'
    },
    {
        id: 'ERC20',
        name: 'Ethereum (ERC-20)',
        icon: '/icons/erc20.png',
        fee: '0.001 ETH',
        speed: '中',
        description: '以太坊主网'
    },
    {
        id: 'TRC20',
        name: 'Tron (TRC-20)',
        icon: '/icons/trc20.png',
        fee: '1 USDT',
        speed: '快',
        description: '波场网络'
    }
];

const DepositNetworkPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AppHeader title="选择充值网络" showBack />

            <List
                dataSource={networkData}
                renderItem={(item) => (
                    <Card
                        hoverable
                        style={{
                            marginBottom: 12,
                            borderRadius: 8,
                            border: '1px solid #f0f0f0',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                        }}
                        onClick={() => navigate('/deposit/address')}
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
                                        <Text type="secondary">{item.description}</Text>
                                        <Text type="secondary">手续费: {item.fee}</Text>
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

export default DepositNetworkPage;