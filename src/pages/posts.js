import Helmet from "react-helmet";
import React, { Component } from "react";
import slugify from "slugify";
import { graphql, Link } from "gatsby";

import { H1, H2 } from "@sens8/component-typography/display";
import Text from "@sens8/component-typography/linear";
import { Tag } from "sens8";

import SiteLayout from "../site-layout";

export default class PostsPage extends Component {
  render() {
    return (
      <SiteLayout>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <section
          css={theme => ({
            alignItems: "center",
            background: theme.colors.backgroundLayers[3],
            display: "flex",
            flexDirection: "column",
            height: "40vh",
            justifyContent: "center",
            marginBottom: "1.5rem"
          })}
        >
          <H1
            css={{ fontSize: "1.5em", color: "#ff79c6", marginBottom: "0.5em" }}
          >
            Chris Biscardi
          </H1>
          <Text css={{ color: "#bd93f9", textAlign: "center" }}>Posts</Text>
        </section>
        {this.props.data.allMdx.edges.map(({ node }) => {
          const { excerpt, frontmatter = {}, id, parent } = node;
          return (
            <PostBox
              key={id}
              excerpt={excerpt}
              title={frontmatter.title}
              date={frontmatter.date}
              tags={frontmatter.tags}
              url={
                frontmatter.url ||
                `/post/${frontmatter.slug ||
                  slugify(parent.name, { lower: true })}`
              }
            />
          );
        })}
      </SiteLayout>
    );
  }
}

class PostBox extends Component {
  render() {
    const { url, title, excerpt, tags, date } = this.props;
    return (
      <div css={{ margin: "auto", maxWidth: "38rem" }}>
        <H2>{title}</H2>
        <Text>
          {excerpt}
          &nbsp;
          <Link to={url} css={{ color: "#ff5e99" }}>
            Read more...
          </Link>
        </Text>
        <div css={{ paddingBottom: "2.5rem" }}>
          {tags &&
            tags.map(v => <Tag css={{ fontFamily: "Inter UI" }}>{v}</Tag>)}
        </div>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query PostsQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date
            slug
            url
            title
            tags
          }
          excerpt
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  }
`;