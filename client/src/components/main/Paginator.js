import React from 'react';
import { Link } from "react-router-dom";

class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }
        render() {
            let pages=[], {size, current}= this.props, last=Math.ceil(size/24), key=1, {filter, search} = this.props.location.state || {};current=+current;
            if(current==1) pages.push(<li  className={`page-item prev`}><a href="javascript:void"></a></li>, <PageItem nr={1} active key={key++} filter={filter} search={search}/>);
            else pages.push(<li  className={`page-item prev`}><Link to={{state: { page: current-1, filter, search}}} ></Link></li>, <PageItem nr={1} key={key++} filter={filter} search={search}/>);

            if(current>4) {
                pages.push(<PageItem nr={"..."} key={key++}/>);
            }
            
            for(let i=current-2; i<current+3 && i<last; i++ ) {
                if(i>1) {
                    if(i==current) pages.push(<PageItem nr={i} active={1} key={key++} filter={filter} search={search}/>);
                    else pages.push(<PageItem nr={i}  key={key++} filter={filter} search={search}/>);
                }
            }

            if(current+3<last) pages.push(<PageItem nr={"..."} key={key++}/>);
            if(last!=1) {
                if(last!=current) pages.push(<PageItem nr={last}  key={key} filter={filter} search={search}/>, <li  className={`page-item next`}><Link to={{state: { page: current+1, filter, search }}} ></Link></li>);
                else pages.push(<PageItem nr={last}  active={1} key={key} filter={filter} search={search}/>, <li  className={`page-item next`}><a href="javascript:void"></a></li>);
            }

            return (
                <nav aria-label="Page navigation example">
                    <ul className="paginator">
                        {pages.length>2 && pages}
                    </ul>
                </nav>
            );
        }
}

const PageItem =({nr, active, className, filter, search }) => (<li  className={`page-item ${active ? "active" : ""} ${className}`}>{active || nr === "..." ? <a >{nr}</a> : <Link to={{
    state: { page: nr, filter, search }
  }} >{nr}</Link>}</li>);

  export default Paginator;