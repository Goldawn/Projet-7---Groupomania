import React, { useEffect } from 'react';

function Comment(props) {

    useEffect(() => console.log(props))
    const {item} = props.location.state
    return(
        <div>
            {JSON.stringify(item)}
        </div>
    )
}
export default Comment;