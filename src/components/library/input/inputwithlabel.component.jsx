import './inputwithlabel.styles.css';
import React,{Fragment} from "react";

const InputWithLabel = ({id, value, type = 'text', onInputChange, isFocused, children})=>{
    return (
        <React.Fragment>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </React.Fragment>
    );

}


export default InputWithLabel;
