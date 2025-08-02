import React, {useEffect, useState} from 'react';
import {Card, Button, List, Typography, Space, Spin, Modal, message} from 'antd';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {loginInfo, getCoinList} from '../api/auth';  // 修改路径
import storage from '../utils/storage';  // 修改路径
import AppHeader from '../components/AppHeader';  // 修改路径

const {Text} = Typography;

const HomePage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [balances, setBalances] = useState([
        {coin_symbol: '--', balance: 0, usdt_price: 0},
    ]);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                // 并行获取用户信息和币种列表
                const [userData, coinData] = await Promise.all([
                    loginInfo(),
                    getCoinList() // 新增接口调用
                ]);
                const data = userData.data
                if (!data || !data.token) {
                    storage.removeToken();
                    navigate('/auth');
                    return
                }
                setUserInfo(data);
                setBalances(coinData.data.map(item => ({
                    coin_symbol: item.coin_symbol,      // 假设接口返回symbol字段
                    balance: item.balance,   // 余额
                    usdt_price: item.usdt_price    // 美元估值
                })));
            } catch (error) {
                console.error('获取用户信息失败:', error);
                if (error.message.includes('Unauthorized')) {
                    storage.removeToken();
                    navigate('/auth');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleLogout = () => {
        storage.removeToken();
        navigate('/auth');
        messageApi.success('已退出登录');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleLogout()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="是否确认退出"
                closable={{'aria-label': 'Custom Close Button'}}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>点击OK按钮退出</p>
            </Modal>
            <div>
                <AppHeader
                    title="资产总览"
                    extra={
                        <UnorderedListOutlined
                            onClick={() => navigate('/orders')}
                            style={{fontSize: 16}}
                        />
                    }
                    showBack={false}
                />

                <Spin spinning={loading} tip="加载中...">
                    <Card title={
                        <Space>
                            {userInfo && (
                                <Space style={{cursor: 'pointer'}}>
                                    欢迎您<Text>{userInfo.nickname}</Text>
                                    <span onClick={showModal}
                                          style={{paddingLeft: '2px', color: "gray", fontSize: '12px'}}>退出</span>
                                </Space>
                            )}
                        </Space>
                    }>

                        <List
                            dataSource={balances}
                            renderItem={(item) => (
                                <List.Item>
                                    <Text strong style={{width: 60}}>{item.coin_symbol}</Text>
                                    <Text>{item.balance}</Text>
                                    <Text type="secondary" style={{marginLeft: 'auto'}}>
                                        ${item.usdt_price.toLocaleString()}
                                    </Text>
                                </List.Item>
                            )}
                        />

                        <Space style={{marginTop: 16, width: '100%'}}>
                            <Button
                                type="primary"
                                icon={<ArrowDownOutlined/>}
                                block
                                onClick={() => navigate('/deposit/coin')}
                            >
                                充币
                            </Button>
                            <Button
                                type="primary"
                                block
                                onClick={() => navigate('/deposit/list')}
                            >
                                充币记录
                            </Button>
                            <Button
                                icon={<ArrowUpOutlined/>}
                                block
                                onClick={() => navigate('/withdraw/coin')}
                            >
                                提币
                            </Button>
                            <Button
                                block
                                onClick={() => navigate('/withdraw/list')}
                            >
                                提币记录
                            </Button>
                        </Space>
                    </Card>
                </Spin>
            </div>
        </>
    );
};

export default HomePage;