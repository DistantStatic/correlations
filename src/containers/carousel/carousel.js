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
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <TokenImage tokenId={tokenList[1]} />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <TokenImage tokenId={tokenList[2]} />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>

            </Carousel.Item>
        </Carousel>
    )
}