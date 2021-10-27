import { useState, useEffect } from 'react';
import { Carousel } from "react-bootstrap";
import TokenImage from '../../components/token-image/token-image';

export default function MyCarousel() {
    const [tokenList, setTokenList] = useState([]);

    function getRandomToken() {
        return Math.floor(Math.random() * 49) + 1
    }

    useEffect(() =>{
        (async () => {
            const tokenArr = [];
            for (let i = 0; i < 3; i++ ) {
                let token = getRandomToken();
                while(tokenArr.indexOf(token) >= 0){
                    token = getRandomToken();
                }
                tokenArr.push(token);
            }
            setTokenList(tokenArr);
        })()
    }, [])

    return(
        <Carousel fade>
            <Carousel.Item>
                <TokenImage tokenId={tokenList[0]} />
                <Carousel.Caption>
                    <h3>Exciting Generative ArtWork!</h3>
                    <p>High quality, low supply, extreme detail</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <TokenImage tokenId={tokenList[1]} />
                <Carousel.Caption>
                    <h3>Uniquely generated!</h3>
                    <p>Each piece different from the last</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <TokenImage tokenId={tokenList[2]} />
                <Carousel.Caption>
                    <h3>Mint Today!</h3>
                    <p>Supply will not last!</p>
                </Carousel.Caption>

            </Carousel.Item>
        </Carousel>
    )
}