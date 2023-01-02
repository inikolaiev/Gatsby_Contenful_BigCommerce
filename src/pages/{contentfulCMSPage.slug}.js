import React from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";

export default function contentfulHomePage(props) {
  console.log(props.data.contentfulHomePage.title);
  return (
    <Layout>
        <h1>ContentfulPage</h1>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery {
      contentfulHomePage{
          id
          title
      }
  }
`
