import React from 'react';
import Select from 'react-select';
import {options} from '../helpers';

const ApiBar = ({value, onChange}) => (
    <div className="api-bar row">
         <li>
            <Select options={options} onChange={onChange} isClearable={false} isSearchable={false} value={value} className={"admin-select"}/>
        </li>
        
     </div>
)

export default ApiBar;