import React from 'react'
import './chat.css'
function MsgRcd({m}) {
    return (
        <div className="msg-rcd">
                          <div className="message-text">{m.text} </div>
                          </div>
    )
}

export default MsgRcd
