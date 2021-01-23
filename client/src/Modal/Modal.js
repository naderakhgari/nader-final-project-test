import React, { useState } from "react";

import "./Modal.css";

export default function Mentors(props) {

	const [isOpen,setIsOpen]=useState(true);
    	return(
    		<React.Fragment>
    			{isOpen && (<div className='modal'>
    				<div className='modal-body'>
    					<h4 className='modalText'>{props.modalText}</h4>
					<div className='buttonRow'>
						{props.func?<button className='btn-primary btn-sm w-25 modal-button' onClick={()=> {
							setIsOpen(false);
							props.func();
							props.setModalText(null);
						}
						}>ok</button>:null}
						{props.close!==false?<button className='btn-primary btn-sm w-25 modal-button' onClick={()=> {
							setIsOpen(false);
							props.setModalText(null);
						}
						}>close</button>:null}</div>
    				</div>
    			</div>)}
    		</React.Fragment>
    	);
}
