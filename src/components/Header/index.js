import React from 'react'
import '../../css/header.css'
import {Link} from 'gatsby'
import {
  GithubIcon,
  LinkedInIcon,
  ObservableIcon,
  TwitterIcon,
} from './SocialIcons'

const Nav = ({children}) => <div className="header-nav">{children}</div>

const Header = () => (
  <div className="header-root">
    <Nav>
      <div className="header-container">
        <div className="header-name">
          <Link className="header-name-link" to="/">
            Jon Sadka.
          </Link>
        </div>
        <div className="social-icons">
          <TwitterIcon />
          <ObservableIcon />
          <GithubIcon />
          <LinkedInIcon />
        </div>
      </div>
    </Nav>
  </div>
)

export default Header
