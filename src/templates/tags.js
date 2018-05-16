import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import Link from 'gatsby-link'

const PageContainer = styled.div`
  margin: 30px 0 60px 0;
`

const Tag = styled.li`
  margin-bottom: 15px;
  list-style-type: none;
`;

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <PageContainer>
      <h2>{tagHeader}</h2>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter
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
  )
}

// Tags.propTypes = {
//   pathContext: PropTypes.shape({
//     tag: PropTypes.string.isRequired,
//   }),
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       totalCount: PropTypes.number.isRequired,
//       edges: PropTypes.arrayOf(
//         PropTypes.shape({
//           node: PropTypes.shape({
//             frontmatter: PropTypes.shape({
//               path: PropTypes.string.isRequired,
//               title: PropTypes.string.isRequired,
//             }),
//           }),
//         }).isRequired,
//       ),
//     }),
//   }),
// };

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
