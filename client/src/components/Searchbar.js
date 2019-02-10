import React from 'react';

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state={loading: false};
      this.toggleLoading=this.toggleLoading;
      this.setVal=this.setVal.bind(this);
    }

    toggleLoading() {
      this.setState((state) => ({loading: !state.loading}));
    }

    setVal(val) {
      this.search.value=val;
    }

    clear() {
      this.search.value = "";
    }

    render() {
    return (
      <div className="col-12 col-md-8 col-lg-9">
      <div className={this.state.loading ? "ui icon input loading" : "ui icon input "}>
          <input type="text" ref={(search) => this.search=search} placeholder="Caută..." onChange={this.props.onChange}/>
          <i className="search icon"></i>
      </div>
     </div>
    )
    }
  }

  export default Search;
