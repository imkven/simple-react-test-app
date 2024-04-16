import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Form,
  Image,
  InputGroup,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Histories } from "./components";
import { IProduct } from "./types";
import { ProductCard } from "./components/product";

function App() {
  const [isProgressing, setIsProgressing] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const doFetch = () => {
    setErrorMessage("");
    setIsProgressing(true);
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        const product = {
          id: data.id,
          title: data.title,
          description: data.description,
          imageUrl: data.thumbnail,
          price: data.price,
        };
        const postProducts = [...products, product];
        if (postProducts.length > 3) postProducts.shift();
        setProductId("");
        setProducts(postProducts);
        setIsProgressing(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsProgressing(false);
      });
  };

  return (
    <main className="container">
      <section className="p-4 my-2 border">
        <div className="d-flex flex-sm-row flex-column">
          <div className="mr-auto p-2">
            {products.length === 0 && (
              <Image
                src={"https://placehold.co/500x250?text=No Product"}
                width={500}
                rounded
              />
            )}
            {products.length > 0 && (
              <ProductCard product={products[products.length - 1]} />
            )}
          </div>
          <div className="p-2">
            {errorMessage && (
              <Alert key={"danger"} variant={"danger"}>
                {errorMessage}
              </Alert>
            )}
            <h2>Checker</h2>
            <p>
              Key in the number 1 to 100 and click "Query" button. Then, You
              will see the success message. Key in 101 for the error message.
            </p>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
                <Form.Label>Product URL:</Form.Label>
                <Col sm={12}>
                  <InputGroup>
                    <InputGroup.Text id="basic">
                      https://dummyjson.com/products/
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="1 - 100"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  doFetch();
                }}
                disabled={isProgressing || !productId}
              >
                {isProgressing ? "Querying..." : `Query Product ${productId}`}
              </Button>
            </Form>
          </div>
        </div>
      </section>

      <Histories products={products} />
    </main>
  );
}

export default App;
