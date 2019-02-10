import React from 'react';

class ProductCarousel  extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        i: 0
      }
      this.onMove=this.onMove.bind(this);
    }

     componentWillReceiveProps(nextProps) {
       if(nextProps.location !== this.props.location || this.props.color !== nextProps.color) this.setState({i: 0});
     }

     onMove(dir) {
       console.log(dir);
       this.setState({i: dir === 'back' ? this.state.i-1 : this.state.i+1})
     }

      render() {
        return (
           <div className="row d-none d-md-flex m">
           {this.state.i > 0 && <div className="arrow-left" onClick={(e) => this.onMove('back')}></div>}
           
            {this.props.images.slice(this.state.i, this.state.i + 3).map((img, i)=> <div className={"col-4"} ><div className="product-img-wrapper img-product" style={{backgroundImage:`url(/images/resize/small/${img})`}} onClick={(e)=> this.props.onImageClick(this.state.i + i)}/></div>            
          )}
          {this.state.i + 3 < this.props.images.length && <div className="arrow-right" onClick={(e) => this.onMove('next')}></div>}
        </div> )
      }

      

}

export default ProductCarousel;

