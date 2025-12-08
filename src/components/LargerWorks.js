import React from 'react'
import {Link, withPrefix} from 'gatsby'
import {OutboundLink} from 'gatsby-plugin-google-analytics'
import {LARGER_WORKS} from '../works/larger-works'
import './LargerWorks.css'

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

const LargerWorks = () => (
  <div className="works-section">
    <h4 className="heading-medium">Larger Works</h4>
    <div className="larger-works-carousel">
      {LARGER_WORKS.sort((a, b) => b.createdAt - a.createdAt).map((work) => (
        <div className="larger-works" key={work.url}>
          {work.url.match('http') ? (
            <OutboundLink
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt={work.title}
                src={withPrefix(work.thumbnail)}
                className="centered-image"
              />
            </OutboundLink>
          ) : (
            <Link to={work.url}>
              <img
                alt={work.title}
                src={withPrefix(work.thumbnail)}
                className="centered-image"
              />
            </Link>
          )}
          <div className="work-details">
            <div className="blog-metadata">{formatData(work.createdAt)}</div>
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
      ))}
    </div>
  </div>
)

export default LargerWorks
