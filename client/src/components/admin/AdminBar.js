import React from 'react';


const AdminBar = ({onClear, onPreview, onSubmit, action}) => (
    <div className="row controls">
    <div className="bar-left">
    <button onClick={onClear}>Clear</button>
    {/* <h3 className="action" style={action === "new" ? {color: "#FF6F80", right:'3px'} :{color:"#bb6fff", right: '-8px'}}>{action.capitalize()}</h3> */}
    </div>           
            <div className="bar-center">
                
                <button onClick={(e) => onPreview()}>Preview</button>
                <button onClick={onSubmit}>OK</button>
            </div>
            {/* <div className="bar-right"><LangToggle/></div> */}
    </div>
)
export default AdminBar;