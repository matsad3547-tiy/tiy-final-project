import React from 'react';
import { connect } from 'react-redux'
import { selectPage } from '../actions/actions'

const Header = ({dispatch}) => {

  const onClick = (clicked_id) => {
    let id = clicked_id.target.id
    dispatch(selectPage(id))
  }

  return (
    <div className="header">
      <img className="image" src={require("../../images/sun3.png")}></img>
      <h1>US Solar Energy Resources</h1>
      <ul>
        <li onClick={onClick} id="home">Home</li>
        <li onClick={onClick} id="about">About</li>
        <li onClick={onClick} id="links">Links</li>
      </ul>
    </div>
  )
}
export default connect()(Header)
