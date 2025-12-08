import React from 'react'
import {graphql, Link} from 'gatsby'
import kebabCase from 'lodash/kebabcase'
import './WrittenWorks.css'
import './Tabs.css'

function formatData(ts) {
  const date = new Date(Number(ts))
  const month = date.getMonth()
  const monthIndexToMonthText = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthIndexToMonthText[month] + ' ' + date.getFullYear()
}

const WrittenWorks = ({posts, selectedWrittenWorkTag, _filterWrittenWork}) => (
  <div className="works-section">
    <h4 className="heading-medium">Writing</h4>
    <ul className="tabs">
      {[
        {id: 'all', text: 'All Tags'},
        {id: 'API', text: 'API'},
        {id: 'D3.js', text: 'D3.js'},
        {id: 'JavaScript', text: 'JavaScript'},
        {id: 'jQuery', text: 'jQuery'},
        {id: 'MongoDB', text: 'MongoDB'},
        {id: 'UX / UI', text: 'UX / UI'},
      ].map((tab) => (
        <li
          className={`tab ${
            tab.id === selectedWrittenWorkTag
              ? 'tab-selected'
              : 'tab-unselected'
          }`}
          key={tab.id}
          onClick={() => _filterWrittenWork(tab.id)}
        >
          {tab.text}
        </li>
      ))}
    </ul>
    <div>
      {posts
        .filter((post) => post.node.frontmatter.title.length > 0)
        .filter(
          (post) =>
            selectedWrittenWorkTag === 'all' ||
            post.node.frontmatter.tags.includes(selectedWrittenWorkTag)
        )
        .map(({node: post}) => {
          return (
            <div className="blog-preview" key={post.id}>
              <div className="blog-metadata">
                {formatData(post.frontmatter.date)}
                <span className="middle-dot">/</span>
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    to={`/tags/${kebabCase(tag)}`}
                    key={tag}
                    className="blog-tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <Link to={post.frontmatter.path}>
                <p className="paragraph-large">{post.frontmatter.title}</p>
              </Link>
              <p className="paragraph-small">{post.excerpt}</p>
              <Link to={post.frontmatter.path} className="read-link">
                Read
              </Link>
            </div>
          )
        })}
      <Link to="/tags/" className="blog-tag">
        See all tags
      </Link>
    </div>
  </div>
)

export default WrittenWorks
