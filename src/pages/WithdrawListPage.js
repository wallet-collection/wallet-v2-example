import React, {useEffect, useState} from 'react';
import {Card, List, Select, Spin, Tag} from 'antd';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {withdrawList} from "../api/auth";

const { Option } = Select;

const WithdrawListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                const res = await withdrawList({
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
                    fee: item.fee,
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

    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'gray';
            case 1:
                return 'cyan';
            case 2:
                return 'red';
            case 3:
                return 'lime';
            case 4:
                return 'green';
            case 5:
                return 'red';
            case 6:
                return 'green';
            default:
                return 'gray';
        }
    };
    // 状态（0：审核中，1：审核通过，2：审核不通过，3：链上打包中，4：提币成功，5：提币失败，6：手动成功）
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return '审核中';
            case 1:
                return '审核通过';
            case 2:
                return '审核不通过';
            case 3:
                return '链上打包中';
            case 4:
                return '提币成功';
            case 5:
                return '提币失败';
            case 6:
                return '手动成功';
            default:
                return '审核中';
        }
    };

    return (
        <div>
            <AppHeader title="提现列表（没做翻页和刷新，只显示最近100条）" showBack />
            <Spin spinning={loading}>
                <Card>
                    <List
                        dataSource={lists}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${item.coin_symbol} 提现`}
                                    description={
                                        <>
                                            <div>地址: {item.address}</div>
                                            <div>数量: {item.amount} {item.coin_symbol}</div>
                                            <div>手续费: {item.fee} {item.coin_symbol}</div>
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

export default WithdrawListPage;