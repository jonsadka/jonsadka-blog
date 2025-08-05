import React from 'react'
import {graphql, Link} from 'gatsby'

// Components
import Layout from '../components/layout'
import './tags.css'

const Tags = ({pageContext, data}) => {
  const {tag} = pageContext
  const {edges, totalCount} = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout>
      <div className="page-container">
        <h1 className="heading-xlarge">{tagHeader}</h1>
        <ul>
          {edges.map(({node}) => {
            const {path, title} = node.frontmatter
            return (
              <li className="tag" key={path}>
                <Link to={path}>{title}</Link>
              </li>
            )
          })}
        </ul>
        {/*
          This links to a page that does not yet exist.
          We'll come back to it!
        */}
        <Link to="/tags">See all tags</Link>
      </div>
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
