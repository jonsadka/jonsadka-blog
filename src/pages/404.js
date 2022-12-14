import React from 'react'
import {styled} from 'baseui'

import Layout from '../components/layout'

const PageContainer = styled('div', {
  margin: '30px 0 60px 0',
})

const NotFoundPage = () => (
  <Layout>
    <PageContainer>
      <h2>NOT FOUND</h2>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </PageContainer>
  </Layout>
)

export default NotFoundPage
