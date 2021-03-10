import React from 'react'


const CustomBtn = (props) => {
    return (
        <>
            <button onClick={props?.onClick} className={props.cname}>{props.children}</button>
        </>
    )
}
export default CustomBtn