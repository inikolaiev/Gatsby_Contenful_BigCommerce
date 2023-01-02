import React from "react";
import { Link } from "gatsby";
import {Wrapper} from "./style";

export const Product = ({ product, categoryPath, isCategory} ) => {
    const {name, images, description, price, sku} = product;

    function createMarkup() {
        return {__html: description};
    }

    const productImage = images[0].url_standard;
    const variants = product.variants.length > 1 ?
        (
            <select name={'product-variant'}>
                {product.variants.map(variant =>
                    <option value={variant.sku}>
                        {variant.option_values.map(option =>
                                `${option.option_display_name}: ${option.label} `
                        )}
                    </option>)
                }
            </select>
        ): null;

    return (
      <Wrapper>
          <h2>{name}</h2>
          <img src={productImage} alt="" />
          <h3><span>Price: {price}</span></h3>
          <h3><span>SKU: {sku}</span></h3>
          <div dangerouslySetInnerHTML={createMarkup()}/>
          {isCategory && <Link to={`${categoryPath}/${sku}`}>View Product</Link>}
          {!isCategory && variants}
      </Wrapper>
    );
};

