import React from 'react'

// Utilities
import kebabCase from 'lodash/kebabcase'

// Components
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'

import Layout from '../components/layout'
import '../css/tags.css'

const TagsPage = ({
  data: {
    allMarkdownRemark: {group},
    site: {
      siteMetadata: {title},
    },
  },
}) => (
  <Layout>
    <div className="page-container">
      <Helmet title={title} />
      <div>
        <h1 className="heading-xlarge">Tags</h1>
        <ul>
          {group
            .sort((a, b) => b.totalCount - a.totalCount)
            .map((tag) => (
              <li className="tag" key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.totalCount < 10 ? `0${tag.totalCount}` : tag.totalCount}
                  <span className="forward-slash">/</span>
                  {tag.fieldValue}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
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
