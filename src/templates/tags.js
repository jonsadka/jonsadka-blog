import React from 'react'
import {styled} from 'baseui'
import {graphql, Link} from 'gatsby'

// Components
import Layout from '../components/layout'
import {HeadingXLarge} from 'baseui/typography'

const PageContainer = styled('div', {
  margin: '30px 0 60px 0',
})

const Tag = styled('li', {
  marginBottom: '15px',
  listStyleType: 'none',
})

const Tags = ({pageContext, data}) => {
  const {tag} = pageContext
  const {edges, totalCount} = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout>
      <PageContainer>
        <HeadingXLarge>{tagHeader}</HeadingXLarge>
        <ul>
          {edges.map(({node}) => {
            const {path, title} = node.frontmatter
            return (
              <Tag key={path}>
                <Link to={path}>{title}</Link>
              </Tag>
            )
          })}
        </ul>
        {/*
          This links to a page that does not yet exist.
          We'll come back to it!
        */}
        <Link to="/tags">See all tags</Link>
      </PageContainer>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
