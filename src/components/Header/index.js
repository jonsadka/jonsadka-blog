import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

const MAX_WIDTH = 960

const HeaderContainer = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: ${MAX_WIDTH}px;
  padding: 1.45rem 1.0875rem;
  position: fixed;
  top: 0;
  width: 100%;
`

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
`

const SocialIcons = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
`

const SocialIcon = styled(OutboundLink)`
  display: inline-block;
  align-self: flex-end;
  margin-left: 15px;
  fill: #a3a3a3;

  :hover {
    fill: #060606;
  }
`

function TwitterIcon() {
  return (
    <SocialIcon
      href="https://twitter.com/jonsadka"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg
        height="14"
        width="14"
        viewBox="0 0 72 72"
        aria-label="Twitter"
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z" />
      </svg>
    </SocialIcon>
  )
}

function GithubIcon() {
  return (
    <SocialIcon
      href="https://github.com/jonsadka"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg
        height="14"
        width="14"
        viewBox="0 0 16 16"
        aria-label="Github"
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </SocialIcon>
  )
}

function LinkedInIcon() {
  return (
    <SocialIcon
      href="https://www.linkedin.com/in/jonsadka"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg
        height="14"
        width="14"
        viewBox="0 0 54 54"
        aria-label="LinkedIn"
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50.004,0 C52.207,0 53.998,1.744 53.998,3.894 L53.998,50.104 C53.998,52.254 52.207,54 50.004,54 L3.985,54 C1.787,54 0,52.254 0,50.104 L0,3.894 C0,1.744 1.787,0 3.985,0 L50.004,0 Z M46.016,46.014 L46.016,31.88 C46.016,24.941 44.519,19.605 36.408,19.605 C32.512,19.605 29.899,21.741 28.83,23.768 L28.72,23.768 L28.72,20.244 L21.038,20.244 L21.038,46.014 L29.044,46.014 L29.044,33.267 C29.044,29.906 29.68,26.648 33.848,26.648 C37.957,26.648 38.01,30.492 38.01,33.481 L38.01,46.014 L46.016,46.014 Z M12.009,16.723 C14.569,16.723 16.65,14.642 16.65,12.08 C16.65,9.515 14.569,7.434 12.009,7.434 C9.442,7.434 7.367,9.515 7.367,12.08 C7.367,14.642 9.442,16.723 12.009,16.723 Z M8.003,46.014 L16.015,46.014 L16.015,20.244 L8.003,20.244 L8.003,46.014 Z" />
      </svg>
    </SocialIcon>
  )
}

function ObservableIcon() {
  return (
    <SocialIcon
      href="https://beta.observablehq.com/@jonsadka"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg
        height="14"
        width="14"
        viewBox="0 0 24 24"
        aria-label="Observable"
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21c-1.108 0-2.068-.261-2.88-.783a5.137 5.137 0 0 1-1.867-2.126 11.821 11.821 0 0 1-.952-2.847A16.523 16.523 0 0 1 6 12c0-.862.052-1.686.157-2.474.104-.787.297-1.587.578-2.399.281-.812.643-1.516 1.084-2.113a4.987 4.987 0 0 1 1.735-1.455C10.27 3.186 11.084 3 12 3c1.108 0 2.068.261 2.88.783a5.137 5.137 0 0 1 1.867 2.126c.434.895.751 1.844.952 2.847.2 1.002.301 2.084.301 3.244 0 .862-.052 1.686-.157 2.474a11.76 11.76 0 0 1-.59 2.399c-.29.812-.65 1.516-1.084 2.113-.434.597-1.008 1.082-1.723 1.455-.715.373-1.53.559-2.446.559zm2.118-6.882A2.888 2.888 0 0 0 15 12c0-.824-.287-1.53-.86-2.118C13.566 9.294 12.853 9 12 9c-.853 0-1.566.294-2.14.882A2.925 2.925 0 0 0 9 12c0 .824.287 1.53.86 2.118.574.588 1.287.882 2.14.882.853 0 1.559-.294 2.118-.882zM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" />
      </svg>
    </SocialIcon>
  )
}

const Header = () => (
  <div
    style={{
      marginBottom: 'calc(1.45rem + 83px)',
      maxWidth: `${MAX_WIDTH}px`,
      marginRight: 'auto',
      marginLeft: 'auto',
    }}
  >
    <HeaderContainer>
      <Name>
        <Link
          to={'/'}
          style={{
            color: '#060606',
            fontFamily: 'Libre Franklin',
            textDecoration: 'none',
          }}
        >
          Jon Sadka.
        </Link>
      </Name>
      <SocialIcons>
        {TwitterIcon()}
        {ObservableIcon()}
        {GithubIcon()}
        {LinkedInIcon()}
      </SocialIcons>
    </HeaderContainer>
  </div>
)

export default Header
