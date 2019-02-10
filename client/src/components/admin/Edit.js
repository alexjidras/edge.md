import React from 'react';
import Code from './Code';
import AdminBar from './AdminBar';

class Edit extends React.Component {
    constructor(props) {
        this.onPreview=this.onPreview.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onClear=this.onClear.bind(this);
    }

    onClear() {
        this.code.clear();
    }

    onPreview() {
        this.props.onPreview({product: JSON.parse(this.code.getCode())});
    }

    onSubmit() {
        this.props.onSubmit({product: JSON.parse(this.code.getCode())}, "PUT");
    }

    render() {
        return (
            <React.Fragment>
                <AdminBar onClear={this.onClear} onPreview={this.onPreview} onSubmit={this.onSubmit}/>
                <Code code={JSON.stringify(this.props.product, null, 2)} ref={(code)=> this.code = code}/>
            </React.Fragment>
        )
    }
}

export default Edit;