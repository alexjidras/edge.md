import React from 'react';

class Console extends React.Component {
    state = {height: '100%'};
    setHeight(h) {
        this.setState({height: `calc(100% - ${h}px)`})
    }
    render() {
        return (
            <div className="col-12 console" style={{height: this.state.height}}>
                {this.props.output.map((o)=> <p className={"console-output" + (o.error ? " console-error" : "")}><span>></span> {`${o.status} ${o.error ? '\n' + o.message : ''}`}</p>)}
                <p className="console-output"><span>></span></p>
            </div>
    )}
}

export default Console;