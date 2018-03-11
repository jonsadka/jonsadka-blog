import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const Header = () => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <Name style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'black',
            fontFamily: 'Libre Franklin',
            textDecoration: 'none',
          }}
        >
          Jon Sadka.
        </Link>
      </Name>
    </div>
  </div>
)

export default Header
