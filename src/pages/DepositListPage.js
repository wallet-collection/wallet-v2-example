import React, {useEffect, useState} from 'react';
import {Card, List, Select, Spin, Tag} from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {rechargeList} from "../api/auth";

const { Option } = Select;

const DepositListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                // 并行获取用户信息和币种列表
                const res = await rechargeList({
                    page: 1,
                    limit: 100,
                });
                const data = res.data
                if (data.code > 0) {
                    return
                }
                setLists(data.map(item => ({
                    id: item.id,
                    network_name: item.network_name,
                    coin_symbol: item.coin_symbol,
                    address: item.address,
                    amount: item.amount,
                    status: item.status,
                    modified_time: item.modified_time,
                })));
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    // 状态（0：区块确认中，1：充值到账，2：区块确认失败）
    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'green';
            case 1:
                return 'green';
            case 2:
                return 'red';
            default:
                return 'gray';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return '区块确认中';
            case 1:
                return '充值到账';
            case 2:
                return '区块确认失败';
            default:
                return 'gray';
        }
    };

    return (
        <div>
            <AppHeader title="充值列表（没做翻页和刷新，只显示最近100条）" showBack />
            <Spin spinning={loading}>
                <Card>
                    <List
                        dataSource={lists}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${item.coin_symbol} 充值`}
                                    description={
                                        <>
                                            <div>地址: {item.address}</div>
                                            <div>数量: {item.amount} {item.coin_symbol}</div>
                                            <div>时间: {item.modified_time}</div>
                                        </>
                                    }
                                />
                                <Tag color={getStatusColor(item.status)}>{getStatusText(item.status)}</Tag>
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        </div>
    );
};

export default DepositListPage;