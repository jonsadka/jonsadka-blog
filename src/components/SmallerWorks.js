import React from 'react'
import {OutboundLink} from 'gatsby-plugin-google-analytics'
import './SmallerWorks.css'
import './Tabs.css'

const DEFAULT_MARGIN = 30
const SMALL_THUMBNAIL_HEIGHT = 100
const SCROLL_BAR_HEIGHT = 20

const BLOCKS_ID = 'blocks'
const OBSERVABLE_ID = 'observable'

const SmallerWorks = ({
  smallerWorks,
  selectedSmallerWorkType,
  _filterSmallerWork,
}) => (
  <div className="works-section">
    <h4 className="heading-medium">Experiments</h4>
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
          onClick={() => _filterSmallerWork(tab.id)}
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
            <div className="thumbnail-small">
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
)

export default SmallerWorks
