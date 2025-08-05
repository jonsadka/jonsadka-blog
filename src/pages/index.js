import React from 'react'
import {graphql, Link, withPrefix} from 'gatsby'
import kebabCase from 'lodash/kebabcase'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

import Layout from '../components/layout'
import {LARGER_WORKS} from '../works/larger-works'
import '../css/index.css'

const DEFAULT_MARGIN = 30
const SMALL_THUMBNAIL_HEIGHT = 100
const SCROLL_BAR_HEIGHT = 20

const BLOCKS_ID = 'blocks'
const OBSERVABLE_ID = 'observable'

const SIZE = {
  SMALL: 'small',
  LARGE: 'large',
}

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

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSmallerWorkType: 'all',
      selectedWrittenWorkTag: 'all',
    }
  }

  _filterSmallerWork(workType) {
    this.setState({selectedSmallerWorkType: workType})
  }

  _filterWrittenWork(tag) {
    this.setState({selectedWrittenWorkTag: tag})
  }

  render() {
    const {selectedSmallerWorkType, selectedWrittenWorkTag} = this.state
    const {data, pageContext} = this.props
    const {edges: posts} = data.allMarkdownRemark
    const {smallerWorks} = pageContext
    return (
      <Layout>
        <div className="works-section">
          <h4 className="heading-medium">Larger Works</h4>
          <div className="larger-works-carousel">
            {LARGER_WORKS.sort((a, b) => b.createdAt - a.createdAt).map(
              (work) => (
                <div className="larger-works" key={work.url}>
                  <div className={`thumbnail thumbnail-${SIZE.LARGE}`}>
                    {work.url.match('http') ? (
                      <OutboundLink
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className={`thumbnail-image-${SIZE.LARGE}`}
                          alt={work.title}
                          src={withPrefix(work.thumbnail)}
                        />
                      </OutboundLink>
                    ) : (
                      <Link to={work.url}>
                        <img
                          className={`thumbnail-image-${SIZE.LARGE}`}
                          alt={work.title}
                          src={withPrefix(work.thumbnail)}
                        />
                      </Link>
                    )}
                  </div>
                  <div className="work-details">
                    <div className="blog-metadata">
                      {formatData(work.createdAt)}
                    </div>
                    <OutboundLink
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-title"
                    >
                      {work.title}
                    </OutboundLink>
                    <div className="work-description">{work.description}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="works-section">
          <h4 className="heading-medium">Smaller Works</h4>
          <ul className="tabs">
            {[
              {id: 'all', text: 'All Sources'},
              {id: OBSERVABLE_ID, text: 'Observable'},
              {id: BLOCKS_ID, text: 'Bl.ocks'},
            ].map((tab) => (
              <li
                className={`tab ${
                  tab.id === selectedSmallerWorkType
                    ? 'tab-selected'
                    : 'tab-unselected'
                }`}
                key={tab.id}
                onClick={() => this._filterSmallerWork(tab.id)}
              >
                {tab.text}
              </li>
            ))}
          </ul>
          <div
            className="smaller-works-carousel"
            style={{
              height: `${
                SMALL_THUMBNAIL_HEIGHT +
                2 * (SMALL_THUMBNAIL_HEIGHT + DEFAULT_MARGIN) +
                SCROLL_BAR_HEIGHT
              }px`,
            }}
          >
            {smallerWorks
              .filter(
                (smallerWork) =>
                  selectedSmallerWorkType === 'all' ||
                  smallerWork.workType === selectedSmallerWorkType
              )
              .map((smallerWork, i) => (
                <div className="smaller-works" key={i}>
                  <div className={`thumbnail thumbnail-${SIZE.SMALL}`}>
                    <OutboundLink
                      href={smallerWork.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className={`smaller-work-image ${
                          smallerWork.workType === OBSERVABLE_ID
                            ? 'smaller-work-image-observable'
                            : ''
                        }`}
                        alt={smallerWork.alt}
                        src={smallerWork.imgUrl}
                      />
                    </OutboundLink>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="works-section">
          <h4 className="heading-medium">Written Works</h4>
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
                onClick={() => this._filterWrittenWork(tab.id)}
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
                      <p className="paragraph-large">
                        {post.frontmatter.title}
                      </p>
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
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: {frontmatter: {published: {ne: false}}}
      sort: {frontmatter: {date: DESC}}
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
