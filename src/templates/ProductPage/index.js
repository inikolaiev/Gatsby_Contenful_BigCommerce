import React from "react";
import { Layout, Product } from "../../components";

const ProductPage = (props) => {
	const {product} = props.pageContext;
	return(
		<Layout>
			<div>
				<h1>Product Page</h1>
				<Product product={product} />
			</div>
		</Layout>
	)
};

export default ProductPage;
