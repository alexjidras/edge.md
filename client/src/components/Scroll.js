import React from 'react';

class ScrollTop extends React.Component {
    componentDidUpdate(prevProps) {
      let curPage = this.props.location.state && this.props.location.state.page, prevPage = prevProps.location.state && prevProps.location.state.page;
      if (this.props.location.pathname !== prevProps.location.pathname || prevPage !== curPage) {
        window.scrollTo(0, 0)
      }
    }
  
    render() {
      return this.props.children
    }
  }
  
  export default ScrollTop;