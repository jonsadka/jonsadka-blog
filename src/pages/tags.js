import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

// Utilities
import kebabCase from 'lodash/kebabcase'

// Components
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const PageContainer = styled.div`
  margin: 30px 0 60px 0;
`

const Tag = styled.li`
  list-style-type: none;
  margin-left: 0;
  margin-bottom: 30px;
`

const ForwardSlash = styled.span`
  margin: 0 10px;
`

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <PageContainer>
      <Helmet title={title} />
      <div>
        <h2>Tags</h2>
        <ul>
          {group.sort((a, b) => b.totalCount - a.totalCount).map(tag => (
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

// TagsPage.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       group: PropTypes.arrayOf(
//         PropTypes.shape({
//           fieldValue: PropTypes.string.isRequired,
//           totalCount: PropTypes.number.isRequired,
//         }).isRequired,
//       ),
//     }),
//     site: PropTypes.shape({
//       siteMetadata: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//       }),
//     }),
//   }),
// };

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
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
