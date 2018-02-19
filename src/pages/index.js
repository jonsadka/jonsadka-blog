import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

// import '../css/index.css'; // add some style if you want!

function formatData(ts) {
  const date = new Date(Number(ts))
  return [ date.getMonth() + 1, date.getDate(), date.getFullYear() ].join("/")
}

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div className="blog-posts">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog-post-preview" key={post.id}>
              <h1>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h1>
              <h2>{formatData(post.frontmatter.date)}</h2>
              <h4>{post.frontmatter.tags.join(', ')}</h4>
              <p>{post.excerpt}</p>
            </div>
          )
        })}
      <Link to="/tags/">See tags</Link>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { published: { ne: false } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date
            tags
            path
          }
        }
      }
    }
  }
`
