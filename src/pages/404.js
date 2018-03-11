import React from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
  margin: 30px 0 60px 0;
`

const NotFoundPage = () => (
  <PageContainer>
    <h2>NOT FOUND</h2>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </PageContainer>
)

export default NotFoundPage
