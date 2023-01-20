import React from "react";
import { Layout, Product } from "../../components";
import { graphql } from "gatsby";

const Category = (props) => {
  const { pageContext, path: categoryPath } = props;
  const allCategoryProducts = props.data.allBigCommerceProducts.edges;
  console.log(props.pageContext.categoryIds);
  return (
    <Layout>
      <div>
        <h1>{pageContext.title}</h1>
        <ul>
          {allCategoryProducts.length ?
          allCategoryProducts.map((item) => (
            <li>
              <Product
                key={item.node.id}
                categoryPath={categoryPath}
                isCategory
                product={item.node}
              />
            </li>
          )) : <li>No products</li>
          }
        </ul>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query productsQuery($categoryIds: [Int]) {
    allBigCommerceProducts(
      filter: { categories: { in: $categoryIds }, is_visible: { eq: true } }
    ) {
      edges {
        node {
          images {
            url_standard
          }
          name
          variants {
            option_values {
              label
              option_display_name
            }
          }
          sku
          description
          price
          sale_price
        }
      }
    }
  }
`;
export default Category;
