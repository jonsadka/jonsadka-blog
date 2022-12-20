import React from 'react'
import {graphql, Link, withPrefix} from 'gatsby'
import kebabCase from 'lodash/kebabcase'
import {styled} from 'baseui'
import {OutboundLink} from 'gatsby-plugin-google-analytics'
import {
  HeadingMedium,
  HeadingSmall,
  ParagraphLarge,
  ParagraphSmall,
} from 'baseui/typography'

import Layout from '../components/layout'
import {LARGER_WORKS} from '../works/larger-works'

const DEFAULT_MARGIN = 30
const SMALL_THUMBNAIL_HEIGHT = 100
const SCROLL_BAR_HEIGHT = 20

const BLOCKS_ID = 'blocks'
const OBSERVABLE_ID = 'observable'

const SIZE = {
  SMALL: 'small',
  LARGE: 'large',
}

const BlogPreview = styled('div', ({$theme}) => ({
  marginBottom: $theme.sizing.scale1600,
}))

const BlogMetadata = styled('div', ({$theme}) => ({
  color: $theme.colors.contentInverseTertiary,
  display: 'inline-block',
  fontSize: '12px',
  marginBottom: $theme.sizing.scale100,
}))

const BlogTag = styled(Link, ({$theme}) => ({
  color: $theme.colors.contentInverseTertiary,
  display: 'inline-block',
  fontSize: '12px',
  paddingRight: '10px',
  transition: 'color 0.2s ease',

  ':hover': {
    color: $theme.colors.contentPrimary,
  },
}))

const MiddleDot = styled('span', {
  fontSize: '12px',
  padding: '0 10px',
})

const ReadLink = styled(Link, {
  display: 'block',
  fontSize: '12px',
  letterSpacing: '0.05rem',
})

const WorksSection = styled('div', {
  margin: `${DEFAULT_MARGIN}px 0 60px 0`,
})

const LargerWorksCarousel = styled('div', {
  overflowX: 'scroll',
  webkitOverflowScrolling: 'touch',
  whiteSpace: 'nowrap',
})

const SmallerWorksCarousel = styled('div', {
  overflowX: 'scroll',
  webkitOverflowScrolling: 'touch',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  height: `${
    SMALL_THUMBNAIL_HEIGHT +
    2 * (SMALL_THUMBNAIL_HEIGHT + DEFAULT_MARGIN) +
    SCROLL_BAR_HEIGHT
  }px`,
  whiteSpace: 'nowrap',
})

const LargerWorks = styled('div', {
  display: 'inline-block',
  marginRight: `${DEFAULT_MARGIN}px`,
  verticalAlign: 'top',
  width: '367px',
})

const SmallerWorks = styled('div', {
  marginRight: `${DEFAULT_MARGIN}px`,
  display: 'inline-block',

  ':not(:nth-child(3n))': {
    marginBottom: `${DEFAULT_MARGIN}px`,
  },
})

const SmallerWorkImage = styled('img', ({$workType}) => ({
  marginLeft: '-5px',
  marginTop: $workType === OBSERVABLE_ID ? '-8px' : '0',
  height: $workType === OBSERVABLE_ID ? '120px' : '100px',
}))

const Thumbnail = styled('div', ({$size, $theme}) => ({
  backgroundColor: $theme.colors.contentPrimary,
  borderRadius: '4px',
  height: $size === SIZE.LARGE ? '200px' : `${SMALL_THUMBNAIL_HEIGHT}px`,
  overflow: 'hidden',
  width: $size === SIZE.LARGE ? '367px' : '184px',
}))

const ThumbnailImage = styled('img', ({$size}) => ({
  width: $size === SIZE.LARGE ? '367px' : '184px',
}))

const WorkDetails = styled('div', {
  padding: `${
    DEFAULT_MARGIN / 2
  }px ${DEFAULT_MARGIN}px ${DEFAULT_MARGIN}px ${DEFAULT_MARGIN}px`,
})

const WorkTitle = styled(OutboundLink, ({$theme}) => ({
  color: $theme.colors.contentPrimary,
  display: 'block',
  marginBottom: $theme.sizing.scale600,
}))

const WorkTitleLink = styled(ParagraphLarge, ({$theme}) => ({
  marginTop: 0,
}))

const WorkDescription = styled('div', ({$theme}) => ({
  color: $theme.colors.contentTertiary,
  fontSize: '12px',
  lineHeight: '20px',
  whiteSpace: 'normal',
}))

const Tabs = styled('ul', {
  marginLeft: 0,
  marginBottom: `${DEFAULT_MARGIN}px`,
})

const Tab = styled('li', ({$selected, $theme}) => ({
  color: $selected
    ? $theme.colors.contentPrimary
    : $theme.colors.contentTertiary,
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '14px',
  marginRight: `${DEFAULT_MARGIN}px`,
  minWidth: `${DEFAULT_MARGIN}px`,
  transition: 'color 0.2s ease',

  ':hover': {
    color: $theme.colors.contentPrimary,
  },
}))

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
        <WorksSection>
          <HeadingMedium>Larger Works</HeadingMedium>
          <LargerWorksCarousel>
            {LARGER_WORKS.sort((a, b) => b.createdAt - a.createdAt).map(
              (work) => (
                <LargerWorks key={work.url}>
                  <Thumbnail $size={SIZE.LARGE}>
                    <OutboundLink
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ThumbnailImage
                        $size={SIZE.LARGE}
                        alt={work.title}
                        src={withPrefix(work.thumbnail)}
                      />
                    </OutboundLink>
                  </Thumbnail>
                  <WorkDetails>
                    <BlogMetadata>{formatData(work.createdAt)}</BlogMetadata>
                    <WorkTitle
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {work.title}
                    </WorkTitle>
                    <WorkDescription>{work.description}</WorkDescription>
                  </WorkDetails>
                </LargerWorks>
              )
            )}
          </LargerWorksCarousel>
        </WorksSection>

        <WorksSection>
          <HeadingMedium>Smaller Works</HeadingMedium>
          <Tabs>
            {[
              {id: 'all', text: 'All Sources'},
              {id: OBSERVABLE_ID, text: 'Observable'},
              {id: BLOCKS_ID, text: 'Bl.ocks'},
            ].map((tab) => (
              <Tab
                $selected={tab.id === selectedSmallerWorkType}
                key={tab.id}
                onClick={() => this._filterSmallerWork(tab.id)}
              >
                {tab.text}
              </Tab>
            ))}
          </Tabs>
          <SmallerWorksCarousel>
            {smallerWorks
              .filter(
                (smallerWork) =>
                  selectedSmallerWorkType === 'all' ||
                  smallerWork.workType === selectedSmallerWorkType
              )
              .map((smallerWork, i) => (
                <SmallerWorks key={i}>
                  <Thumbnail $size={SIZE.SMALL}>
                    <OutboundLink
                      href={smallerWork.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SmallerWorkImage
                        $workType={smallerWork.workType}
                        alt={smallerWork.alt}
                        src={smallerWork.imgUrl}
                      />
                    </OutboundLink>
                  </Thumbnail>
                </SmallerWorks>
              ))}
          </SmallerWorksCarousel>
        </WorksSection>

        <WorksSection>
          <HeadingMedium>Written Works</HeadingMedium>
          <Tabs>
            {/*
              TODO: Make this generative so that adding a new tag updates this list automatically
            */}
            {[
              {id: 'all', text: 'All Tags'},
              {id: 'API', text: 'API'},
              {id: 'D3.js', text: 'D3.js'},
              {id: 'JavaScript', text: 'JavaScript'},
              {id: 'jQuery', text: 'jQuery'},
              {id: 'MongoDB', text: 'MongoDB'},
              {id: 'UX / UI', text: 'UX / UI'},
            ].map((tab) => (
              <Tab
                $selected={tab.id === selectedWrittenWorkTag}
                key={tab.id}
                onClick={() => this._filterWrittenWork(tab.id)}
              >
                {tab.text}
              </Tab>
            ))}
          </Tabs>
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
                  <BlogPreview key={post.id}>
                    <BlogMetadata>
                      {formatData(post.frontmatter.date)}
                      <MiddleDot>/</MiddleDot>
                      {post.frontmatter.tags.map((tag) => (
                        <BlogTag to={`/tags/${kebabCase(tag)}`} key={tag}>
                          {tag}
                        </BlogTag>
                      ))}
                    </BlogMetadata>

                    <Link to={post.frontmatter.path}>
                      <WorkTitleLink>{post.frontmatter.title}</WorkTitleLink>
                    </Link>
                    <ParagraphSmall
                      color="contentTertiary"
                      marginBottom="scale800"
                    >
                      {post.excerpt}
                    </ParagraphSmall>
                    <ReadLink to={post.frontmatter.path}>Read</ReadLink>
                  </BlogPreview>
                )
              })}
            <BlogTag to="/tags/">See all tags</BlogTag>
          </div>
        </WorksSection>
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
