import React from "react";
import { Layout, Product } from "../components";
import { graphql } from "gatsby";

export default function contentfulCmsPage(props) {
  const { contentfulCategoryPage: contentfulData } = props.data;

  return (
    <Layout>
      <h1>{contentfulData.title}</h1>
      <ul>{contentfulData.products.map((item, index) => <li><Product key={index} sku={item}/></li>)}</ul>
    </Layout>
  )
}

export const query = graphql`
    query categoryPageQuery($id: String) {
        contentfulCategoryPage(id: { eq: $id }) {
            id
            products
            title
        }
    }
`;
