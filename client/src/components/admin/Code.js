import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.code || ""
        }
        this.onChange=this.onChange.bind(this);
        this.editorDidMount=this.editorDidMount.bind(this);
    }

    onChange(code) {
        console.log(code);
        this.setState({code});

    }

    componentDidUpdate() {
        this.editor.layout();
    }

    editorDidMount(editor) {
        this.editor = editor;
        this.getCode = () => editor.getValue();
        this.clear = () => this.onChange("");
        editor.focus();
      }
       
    

    render() {
        
        const options = {
            selectOnLineNumbers: true,
            minimap: {
                enabled: false
            },
            scrollbar: {            
                verticalScrollbarSize: 0,
                vertical:'hidden'
                
            },
            renderLineHighlight: 'none'
          };
        return <MonacoEditor
        
        language="json"
        height={this.props.height}
        width="100%"
        value={this.state.code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />

    }
}

export default Code;