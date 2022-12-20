import React from 'react'
import {Link} from 'gatsby'
import {styled} from 'baseui'
import {Button, KIND, SIZE, SHAPE} from 'baseui/button'
import {
  GithubIcon,
  LinkedInIcon,
  ObservableIcon,
  TwitterIcon,
} from './SocialIcons'

const MAX_WIDTH = 1280

const HeaderContainer = styled('div', ({$theme}) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: `${MAX_WIDTH}px`,
  padding: '1.45rem 1.0875rem',
}))

const Nav = styled('div', ({$theme}) => ({
  backgroundColor: $theme.colors.backgroundPrimary,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1,
}))

const Name = styled('div', {
  fontSize: '14px',
  fontWeight: '700',
})

const SocialIcons = styled('div', {
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'flex-end',
})

const HeaderName = styled(Link, ({$theme}) => ({
  color: $theme.colors.contentPrimary,
  fontFamily: 'Libre Franklin',
  textDecoration: 'none',
}))

const Header = ({onToggleTheme, theme}) => (
  <div style={{marginBottom: 'calc(1.45rem + 83px)'}}>
    <Nav>
      <HeaderContainer>
        <Name>
          <HeaderName to="/">Jon Sadka.</HeaderName>
        </Name>
        <SocialIcons>
          {/* <Button
            onClick={onToggleTheme}
            kind={KIND.tertiary}
            size={SIZE.mini}
            shape={SHAPE.circle}
          >
            {theme}
          </Button> */}
          <TwitterIcon />
          <ObservableIcon />
          <GithubIcon />
          <LinkedInIcon />
        </SocialIcons>
      </HeaderContainer>
    </Nav>
  </div>
)

export default Header
