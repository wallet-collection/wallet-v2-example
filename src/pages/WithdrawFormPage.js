import React from 'react';
import { Card, Form, Input, Button, Select, Space, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import AppHeader from '../components/AppHeader';

const { Text } = Typography;

const WithdrawFormPage = () => {
    const [form] = Form.useForm();
    const availableBalance = 0.25; // 假设BTC余额

    const onFinish = (values) => {
        console.log('提币提交:', values);
        // 这里调用API提交提币请求
    };

    return (
        <div>
            <AppHeader title="提币 BTC" showBack />
            <Card title="提币 BTC">
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="coin" label="币种" initialValue="BTC">
                        <Select style={{ width: '100%' }}>
                            <Select.Option value="BTC">BTC</Select.Option>
                            <Select.Option value="ETH">ETH</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="network" label="网络" initialValue="ERC-20">
                        <Select style={{ width: '100%' }}>
                            <Select.Option value="ERC-20">ERC-20</Select.Option>
                            <Select.Option value="TRC-20">TRC-20</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="提币地址"
                        rules={[{ required: true, message: '请输入地址!' }]}
                    >
                        <Input
                            placeholder="0x..."
                            suffix={<Button icon={<CopyOutlined />} type="text" />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="数量"
                        rules={[
                            { required: true, message: '请输入数量!' },
                            { max: availableBalance, message: '超过可用余额!' },
                        ]}
                    >
                        <Input type="number" placeholder="0.1" addonAfter="BTC" />
                    </Form.Item>

                    <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
                        <Text type="secondary">可用余额: {availableBalance} BTC</Text>
                        <Text type="secondary">网络手续费: 0.0005 BTC</Text>
                        <Text strong>实际到账: {form.getFieldValue('amount') ?
                            form.getFieldValue('amount') - 0.0005 : 0} BTC
                        </Text>
                    </Space>

                    <Button type="primary" htmlType="submit" block>
                        提交提币
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default WithdrawFormPage;