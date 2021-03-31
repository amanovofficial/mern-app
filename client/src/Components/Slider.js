import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = ({ images }) => (
    images.length > 0
        ? <Carousel >
            {
                images.map((imageSrc, index) => {
                    return (
                        <Carousel.Item key={index} style={{ 'height': '600px' }}>
                            <img
                                className='d-block w-100'
                                src={`/${imageSrc}`}
                                alt="home"
                            />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
        :null
)

export default Slider