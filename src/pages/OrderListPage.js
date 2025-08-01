import React from 'react';
import { Card, List, Select, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const { Option } = Select;

const OrderListPage = () => {
    const navigate = useNavigate();
    const orders = [
        {
            id: '1',
            coin: 'BTC',
            type: '充值',
            amount: 0.1,
            status: '已完成',
            date: '2023-10-01 14:30',
        },
        {
            id: '2',
            coin: 'ETH',
            type: '提币',
            amount: 2.0,
            status: '处理中',
            date: '2023-10-01 13:15',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case '已完成':
                return 'green';
            case '处理中':
                return 'blue';
            default:
                return 'gray';
        }
    };

    return (
        <div>
            <AppHeader title="订单列表" showBack />
            <Card
                title="订单记录"
                extra={
                    <Select defaultValue="all" style={{ width: 120 }}>
                        <Option value="all">全部币种</Option>
                        <Option value="BTC">BTC</Option>
                        <Option value="ETH">ETH</Option>
                    </Select>
                }
            >
                <List
                    dataSource={orders}
                    renderItem={(item) => (
                        <List.Item onClick={() => navigate(`/order/${item.id}`)}>
                            <List.Item.Meta
                                title={`${item.coin} ${item.type}`}
                                description={
                                    <>
                                        <div>数量: {item.amount} {item.coin}</div>
                                        <div>时间: {item.date}</div>
                                    </>
                                }
                            />
                            <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default OrderListPage;