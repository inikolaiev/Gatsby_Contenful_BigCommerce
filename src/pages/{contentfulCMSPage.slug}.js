import React from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";

export default function contentfulCmsPage(props) {
  const { contentfulCmsPage: contentfulData } = props.data;

  return (
    <Layout>
      <h1>{contentfulData.title}</h1>
    </Layout>
  )
}

export const query = graphql`
    query CMSQuery($id: String) {
        contentfulCmsPage(id: { eq: $id }) {
            id
            title
        }
    }
`;
