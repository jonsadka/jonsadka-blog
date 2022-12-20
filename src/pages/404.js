import React from 'react'
import {styled} from 'baseui'
import {HeadingXLarge, ParagraphSmall} from 'baseui/typography'

import Layout from '../components/layout'

const PageContainer = styled('div', {
  margin: '30px 0 60px 0',
})

const NotFoundPage = () => (
  <Layout>
    <PageContainer>
      <HeadingXLarge>NOT FOUND</HeadingXLarge>
      <ParagraphSmall>
        You just hit a route that doesn&#39;t exist... the sadness.
      </ParagraphSmall>
    </PageContainer>
  </Layout>
)

export default NotFoundPage
