import React from 'react';
import { connect } from 'react-redux'
import { selectPage } from '../actions/actions'
import Img from 'react-image-load'

const HeaderImage = () => {
  return (
    <Img
      className="image"
      rotate={90}
      src={require("../../images/sun3.png")}
    />
  )
}


const Header = ({dispatch}) => {

  const onClick = (clicked_id, e) => {
    let id = clicked_id.target.id
    e.preventDefault()
    dispatch(selectPage(id))
  }

  return (
    <div className="App-header">
      <HeaderImage />
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
