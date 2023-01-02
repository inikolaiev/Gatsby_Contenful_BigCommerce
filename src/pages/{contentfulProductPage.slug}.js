import React from "react";
import { Layout, Product } from "../components";
import { graphql } from "gatsby";

export default function contentfulCmsPage(props) {
  const { contentfulProductPage: contentfulData } = props.data;

  return (
    <Layout>
      <h1>{contentfulData.title}</h1>
      <Product sku={contentfulData.product} />
    </Layout>
  )
}

export const query = graphql`
    query productPageQuery($id: String) {
        contentfulProductPage (id: { eq: $id }) {
            product
            title
            id
        }
    }
`;
