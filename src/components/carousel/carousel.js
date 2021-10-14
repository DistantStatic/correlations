import { Carousel } from "react-bootstrap";
import TokenImage from '../token-image/token-image';

export default function MyCarousel() {
    return(
        <Carousel>
            <Carousel.Item>
                <TokenImage tokenId={1} />

                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <TokenImage tokenId={15} />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <TokenImage tokenId={30} />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>

            </Carousel.Item>
        </Carousel>
    )
}