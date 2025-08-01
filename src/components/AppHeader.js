// src/components/AppHeader.js
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Space, Typography } from 'antd';

const { Title } = Typography;

const AppHeader = ({ title, showBack = true }) => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <Space align="center">
                {showBack && (
                    <ArrowLeftOutlined
                        onClick={() => navigate(-1)}
                        style={{ fontSize: '18px', marginRight: '8px' }}
                    />
                )}
                <Title level={5} style={{ margin: 0 }}>{title}</Title>
            </Space>
        </div>
    );
};

export default AppHeader;