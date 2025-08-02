import React, { useState } from 'react';
import { Form, Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, register } from '../api/auth';
import storage from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login'); // 新增状态管理
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate(); // 初始化导航函数
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            // 根据当前tab决定调用登录还是注册接口
            const response = activeTab === 'login'
                ? await login({ account: values.username, pwd: values.password })
                : await register({
                    account: values.username,
                    pwd: values.password,
                    confirmPassword: values.confirmPassword
                });

            // 存储token并跳转
            const data = response.data
            if (response.code > 0) {
                messageApi.error(response.message);
                return
            }
            storage.setToken(data.token);
            messageApi.success(`${activeTab === 'login' ? '登录' : '注册'}成功`);
            setTimeout(() => {
                navigate('/');
            }, 1000)
        } catch (error) {
            messageApi.error(error.response?.data?.message || '操作失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: 60 }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab} // 绑定状态更新
                    centered
                >
                    <TabPane tab="登录" key="login">
                        <Form form={form} onFinish={handleSubmit}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                            >
                                登录
                            </Button>
                        </Form>
                    </TabPane>

                    <TabPane tab="注册" key="register">
                        <Form form={form} onFinish={handleSubmit}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: '请确认密码' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('两次密码不一致');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                            >
                                注册
                            </Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
};

export default AuthPage;