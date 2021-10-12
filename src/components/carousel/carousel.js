import { Carousel } from "react-bootstrap";

export default function MyCarousel() {
    const baseUrl = 'http://localhost:3001/'
    const imageHeight = '917em';
    const imageWidth = '600em';
    return(
        <Carousel>
            <Carousel.Item>

                <img
                    className="d-block w-100"
                    height={imageHeight}
                    width={imageWidth}
                    src={`${baseUrl}1`}
                    alt="First slide"
                />

                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <img
                    className="d-block w-100"
                    height={imageHeight}
                    width={imageWidth}
                    src={`${baseUrl}15`}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <img
                    className="d-block w-100"
                    height={imageHeight}
                    width={imageWidth}
                    src={`${baseUrl}30`}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>

            </Carousel.Item>
        </Carousel>
    )
}