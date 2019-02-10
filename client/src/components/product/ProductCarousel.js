import React from 'react';
import Slider from "react-slick";
import {isMobile} from '../helpers';


class ProductCarousel  extends React.Component {
     componentWillReceiveProps(nextProps) {
         this.slider.slickGoTo(nextProps.goTo);
     }
      render() {
        const settings = {
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false
              }}
            ] 
          };
        return (
            <Slider {...settings} ref={slider => (this.slider = slider)} onChange={(i)=> this.props.onImageChange(i)}>
              {this.props.images.map((image)=> <div className="product-img-wrapper" >
                      <div className="product-img-main" style={{backgroundImage: `url(/images/resize/${isMobile(this.props.width) ? 'medium' : 'big'}/${image})`}}></div>
                {/* <img className="img-carousel" src={`/images/resize/${isMobile(this.props.width) ? 'medium' : 'big'}/${image}`}/>             */}
              </div>)}
            </Slider>
          );

      }

}

export default ProductCarousel;

