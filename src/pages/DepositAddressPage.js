// src/pages/DepositAddressPage.js
import React from 'react';
import { Card, Button, Select, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import {QRCodeCanvas} from 'qrcode.react';
import AppHeader from '../components/AppHeader';

const DepositAddressPage = () => {
    const address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';

    return (
        <div>
            <AppHeader title="充值 BTC" showBack />
            <Card>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <QRCodeCanvas
                        value={address}
                        size={150}
                        level="H"
                        includeMargin
                    />
                    <Button type="link" style={{ display: 'block', marginTop: '8px' }}>
                        保存二维码
                    </Button>
                </div>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                        <strong>地址:</strong> {address}
                        <Button icon={<CopyOutlined />} type="text" onClick={() => navigator.clipboard.writeText(address)} />
                    </div>
                    <div>
                        <strong>网络:</strong>
                        <Select defaultValue="ERC-20" style={{ width: 120, marginLeft: 8 }}>
                            <Select.Option value="ERC-20">ERC-20</Select.Option>
                            <Select.Option value="TRC-20">TRC-20</Select.Option>
                        </Select>
                    </div>
                    <div>
                        <small>最小充值: 0.001 BTC</small>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default DepositAddressPage;