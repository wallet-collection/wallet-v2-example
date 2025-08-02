// src/pages/DepositAddressPage.js
import React, {useEffect, useState} from 'react';
import {Card, Button, Space, Spin, message} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import {QRCodeCanvas} from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {getRechargeAddress} from "../api/auth";

const DepositAddressPage = () => {
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState('');

    const { coin_symbol, network_name, is_recharge, min_recharge } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 并行获取用户信息和币种列表
                const res = await getRechargeAddress({coin_symbol: coin_symbol, network_name: network_name}) // 新增接口调
                if (res.code === 0 && res.data.address) {
                    setAddress(res.data.address);
                }
                console.log(res)
            } catch (error) {
                console.error('获取信息失败:');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 复制功能实现
    const handleCopy = () => {
        navigator.clipboard.writeText(address)
            .then(() => {
                messageApi.success('地址已复制到剪贴板');
            })
            .catch((err) => {
                messageApi.error('复制失败，请手动选择文本复制');
                console.error('复制错误:', err);
            });
    };

    return (
        <>
            {contextHolder}
            <div>
                <AppHeader title={`充值 ${coin_symbol}(${network_name})`} showBack />
                <Spin spinning={loading}>
                    <Card>
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <QRCodeCanvas
                                value={address}
                                size={150}
                                level="H"
                                includeMargin
                            />
                        </div>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <strong>地址:</strong> {address}
                                <Button icon={<CopyOutlined />} type="text" onClick={handleCopy} />
                            </div>
                            <div>
                                <small>最小充值: {min_recharge} {coin_symbol}</small>
                            </div>
                        </Space>
                    </Card>
                </Spin>
            </div>
        </>
    );
};

export default DepositAddressPage;