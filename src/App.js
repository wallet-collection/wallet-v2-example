import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomePage,
  DepositCoinPage,
  DepositNetworkPage,
  DepositAddressPage,
  DepositListPage,
  WithdrawCoinPage,
  WithdrawNetworkPage,
  WithdrawFormPage,
  WithdrawListPage,
  AuthPage,
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
              <Route path="/deposit/list" element={<DepositListPage />} />

              <Route path="/withdraw/coin" element={<WithdrawCoinPage />} />
              <Route path="/withdraw/network" element={<WithdrawNetworkPage />} />
              <Route path="/withdraw/form" element={<WithdrawFormPage />} />
              <Route path="/withdraw/list" element={<WithdrawListPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
  );
}

export default App;