import React from "react";
import { Layout, Product } from "../../components";
import { graphql } from "gatsby";

const Category = (props) => {
	const {pageContext, path: categoryPath} = props;
	const allCategoryProducts = props.data.allBigCommerceProducts.edges;

	return(
		<Layout>
			<div>
				<h1>{pageContext.title}</h1>
				<ul>
					{allCategoryProducts.map((item) =>
						<li>
							<Product key={item.node.id} categoryPath={categoryPath} isCategory product={item.node}/>
						</li>)}
				</ul>
			</div>
		</Layout>
	)
};
export const query = graphql`
    query productsQuery($categoryId: Int) {
        allBigCommerceProducts(filter: {categories: {eq: $categoryId}}) {
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
                }
            }
        }
    }
`
export default Category;
