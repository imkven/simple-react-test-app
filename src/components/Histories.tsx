import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { ProductCard } from "./product";
import { IProduct } from "../types";

type Props = {
  products: IProduct[];
};

type State = {};

export class Histories extends Component<Props, State> {
  render() {
    return (
      <section className="p-4 border">
        <h2 className="mb-4 border-bottom">Query History</h2>
        <Row xs={1} md={3} className="g-4">
          {this.props.products.reverse().map((product) => {
            return (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </section>
    );
  }
}
