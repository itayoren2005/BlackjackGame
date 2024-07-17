import React, { useState } from 'react';
import Board from './Board';
type button = {
    OnClickFunction():void,
    Disabled:boolean,
    TextContent:string
}
const Button: React.FC<button> = ({OnClickFunction,Disabled,TextContent}) => {
    return(
    <button onClick={OnClickFunction}  disabled={Disabled}>{TextContent}</button>
   );
};

export default Button;
