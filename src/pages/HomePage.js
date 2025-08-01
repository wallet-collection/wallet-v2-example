import React from 'react';
import { Card, Button, Space, List } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const HomePage = () => {
    const navigate = useNavigate();
    const balances = [
        { coin: 'BTC', amount: 0.25, value: 15000 },
        { coin: 'ETH', amount: 5, value: 2500 },
        { coin: 'USDT', amount: 500, value: 500 },
    ];

    return (
        <div>
            <Card title="资产总览" extra={<UnorderedListOutlined onClick={() => navigate('/orders')} />}>
                <p>总资产: $17,500.00</p>
                <List
                    dataSource={balances}
                    renderItem={(item) => (
                        <List.Item>
                            {item.coin} {item.amount} (${item.value})
                        </List.Item>
                    )}
                />
                <Space>
                    <Button type="primary" icon={<ArrowDownOutlined />} onClick={() => navigate('/deposit/coin')}>
                        充币
                    </Button>
                    <Button icon={<ArrowUpOutlined />} onClick={() => navigate('/withdraw/coin')}>
                        提币
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default HomePage;