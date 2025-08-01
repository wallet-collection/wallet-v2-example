import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomePage,
  DepositCoinPage,
  DepositNetworkPage,
  DepositAddressPage,
  WithdrawCoinPage,
  WithdrawNetworkPage,
  WithdrawFormPage,
  OrderListPage
} from './pages';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
      <Router>
        <Layout className="layout">
          {/*<Header>*/}
          {/*  <div className="logo">OKX Style Wallet</div>*/}
          {/*</Header>*/}
          <Content style={{ padding: '0 16px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/deposit/coin" element={<DepositCoinPage />} />
              <Route path="/deposit/network" element={<DepositNetworkPage />} />
              <Route path="/deposit/address" element={<DepositAddressPage />} />
              <Route path="/withdraw/coin" element={<WithdrawCoinPage />} />
              <Route path="/withdraw/network" element={<WithdrawNetworkPage />} />
              <Route path="/withdraw/form" element={<WithdrawFormPage />} />
              <Route path="/orders" element={<OrderListPage />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
  );
}

export default App;