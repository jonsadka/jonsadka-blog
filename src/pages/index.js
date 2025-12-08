import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import LargerWorks from '../components/LargerWorks';
import SmallerWorks from '../components/SmallerWorks';
import WrittenWorks from '../components/WrittenWorks';

import '../pages/index.css';
import '../components/LargerWorks.css';
import '../components/SmallerWorks.css';
import '../components/WrittenWorks.css';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSmallerWorkType: 'all',
      selectedWrittenWorkTag: 'all',
    };
  }

  _filterSmallerWork = (workType) => {
    this.setState({ selectedSmallerWorkType: workType });
  };

  _filterWrittenWork = (tag) => {
    this.setState({ selectedWrittenWorkTag: tag });
  };

  render() {
    const { selectedSmallerWorkType, selectedWrittenWorkTag } = this.state;
    const { data, pageContext } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { smallerWorks } = pageContext;

    return (
      <Layout>
        <LargerWorks />
        <SmallerWorks
          smallerWorks={smallerWorks}
          selectedSmallerWorkType={selectedSmallerWorkType}
          _filterSmallerWork={this._filterSmallerWork}
        />
        <WrittenWorks
          posts={posts}
          selectedWrittenWorkTag={selectedWrittenWorkTag}
          _filterWrittenWork={this._filterWrittenWork}
        />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { published: { ne: false } } }
      sort: { frontmatter: { date: DESC } }
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
`;
