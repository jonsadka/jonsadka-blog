import React from 'react'
import {styled} from 'baseui'

// Utilities
import kebabCase from 'lodash/kebabcase'

// Components
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'

import Layout from '../components/layout'
import {HeadingXLarge} from 'baseui/typography'

const PageContainer = styled('div', {
  margin: '30px 0 60px 0',
})

const Tag = styled('li', {
  listStyleType: 'none',
  marginLeft: '0',
  marginBottom: '30px',
})

const ForwardSlash = styled('span', {
  margin: '0 10px',
})

const TagsPage = ({
  data: {
    allMarkdownRemark: {group},
    site: {
      siteMetadata: {title},
    },
  },
}) => (
  <Layout>
    <PageContainer>
      <Helmet title={title} />
      <div>
        <HeadingXLarge>Tags</HeadingXLarge>
        <ul>
          {group
            .sort((a, b) => b.totalCount - a.totalCount)
            .map((tag) => (
              <Tag key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.totalCount < 10 ? `0${tag.totalCount}` : tag.totalCount}
                  <ForwardSlash>/</ForwardSlash>
                  {tag.fieldValue}
                </Link>
              </Tag>
            ))}
        </ul>
      </div>
    </PageContainer>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: {frontmatter: {published: {ne: false}}}
    ) {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`
