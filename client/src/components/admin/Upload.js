import React from 'react';
import Dropzone from 'react-dropzone';

const styles = {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#eaeaea',
    borderStyle: 'dashed'
  };
const flex = {
    display: 'flex',
    flexFlow: 'row wrap',
    
}

const details = {
    padding: '15px 10px',
    textAlign: 'center',
    fontSize: '14px',
    fontFamily: 'Arial',
    paddingTop: '20px'
}

const x = {
    display:'block',
    top: '-8px',
    right: '10px',
    fontSize: '12px'
}
  const thumb = {
    flex: '0 1 calc(33.3% - 20px)',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    margin: '0px 10px',
    marginBottom: '20px',
    paddingTop: '15px',
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    height: '75px',
    width: '75px',
    margin: 'auto'
  }
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
    marginLeft: '50%',
    transform: 'translateX(-50%)'
  };
 
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files:[]
        }
        this.onDrop = this.onDrop.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.clear=this.clear.bind(this);
    }

    clear() {
        this.setState({files:[]});
    }

    onSubmit() {
        var formData = new FormData();
        this.state.files.forEach((file) => formData.append('file', file));
        fetch('/server/api/upload', {method: "POST", body: formData, headers: {"X-API-KEY": this.props.api_key}, credentials: "same-origin"}).then((res) => {
            res.status === 200 && this.clear();
        })
    }


    onDelete(i) {
        this.setState(({files}) => ({
            files: [...files.slice(0, i), ...files.slice(i+1)]
        }))

    }

    onDrop(files) {
        this.setState({
          files: this.state.files.concat(files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })))
        });
      }
    
      componentWillUnmount() {
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
      }
    
     
    render() {
        return (
                <div className="col-12 mb-0">
                    <div className="row">
                        <div className="col-12 col-md-4 mb-0 files-wrap">
                            {/* <ul> */}
                            <div style={flex}>
                                {this.state.files.map((file, i) => 
                                    <div style={thumb} key={file.name}>
                                    <i class="fal fa-times" onClick={() => this.onDelete(i)} style={x}></i>
                                        <div style={thumbInner}>
                                        <img
                                            src={file.preview}
                                            style={img}
                                        />
                                        </div>
                                        <div style={details}>
                                        {file.name}
                                        
                                        
                                        </div>
                                    </div>)}
                            </div>
                            <button onClick={this.clear}>Clear</button>
                            <button onClick={this.onSubmit}>Upload</button>
                            {/* </ul> */}

                        </div>
                            <div className="col-12 col-md-8 mb-0 drop-wrap">
                                <Dropzone accept="image/*" onDrop={this.onDrop}>
                                {({ getRootProps, getInputProps }) => {

                                    return (
                                    <div
                                        {...getRootProps()}
                                        style={styles}
                                    >
                                        {/* <form action="/upload" method="post" enctype="multipart/form-data" ref={(form) => this.form = form}> */}
                                            <input {...getInputProps()} />
                                        {/* </form> */}
                                        <div className="h"></div>
                                        <div className="v"></div>
                                        
                                    
                                    </div>
                                    )
                                }}
                                </Dropzone>
                            </div>
                    </div>
                </div>
        )
    }
}

export default Upload;