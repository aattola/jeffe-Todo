import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';

let MenuAppBar = (props) => {
  return (
    <div>
      <AppBar color='default' >
        <Toolbar className="appBar">
          <h1 style={{fontFamily: 'Google Sans', fontSize: '35px', marginRight: '10px', color: '#717171'}}>
            jeffe
          </h1>
          <h1 style={{fontFamily: 'Google Sans', fontSize: '35px', color: '#999999'}}>Todo</h1>

          <IconButton className="titleNappi" aria-label="Delete" style={{float: 'right', position: 'absolute', right: 0, marginRight: '10px'}} onClick={() => {window.close()}} >
          ×
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{marginTop: '120px'}}>
        {props.children}
      </div>
    </div>
  )
}

export default MenuAppBar
