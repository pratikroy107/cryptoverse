import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';


const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60';


const News = ({ simplified }) => {
    const [newscategory, setNewscategory] = useState('Cryptocurrency');
    //console.log("simpli = ", simplified);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'cryptocurrency', count: simplified ? 9 : 50 });
    //console.log(cryptoNews);

    const { data } = useGetCryptosQuery(100);


    if (!cryptoNews?.value) return 'Loading...';

    return (
        <>
            <Row gutter={[24, 24]}>
                {/*{!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select a Crypto"
                        optionFilterProp='children'
                        onChange={(value) => setNewscategory(value)}
                        filterOption={(input, option) => option.children.toLowercase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}*/}


                {cryptoNews.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target="_blank">
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                </div>
                                <p>
                                    {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                </p>
                                <div className='provider-container'>
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News