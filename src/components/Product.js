import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//utils
import { add } from "../slices/cart";

//constants
import { STATUS, fetchProducts } from "../slices/product";

function Product() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((store) => store.products);

  const getProducts = async () => {
    dispatch(fetchProducts());
  };

  const addToCart = (product) => {
    dispatch(add(product));
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  if (status === STATUS.LOADING)
    return (
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        Loading...
      </h2>
    );
  if (status === STATUS.FAILED) return <div>Failed to fetch products</div>;
  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.title} />
          <h6>{product.title}</h6>
          <h5>Rs {product.price * 100}</h5>
          <button className="btn" onClick={() => addToCart(product)}>
            Add to card
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product;
