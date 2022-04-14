import React from 'react';
import millify from 'millify';
// millify- to make 240,000 print as 240K
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components';

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    //console.log(globalStats);
    //console.log("data -> ", data);
    if (isFetching) return 'Loading...'; //waiting till globalStats get value and not undefined

    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Market" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className="home-title">Latest crypto news</Title>
                <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage;