import React from "react";
import { Layout, Product } from "../../components";
import { graphql } from "gatsby";

const ProductPage = (props) => {


	return(
		<Layout>
			<div>
				<h1></h1>
				<Product />
			</div>
		</Layout>
	)
};

export default ProductPage;
