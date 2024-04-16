import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { IProduct } from "../../types";

type Props = {
  product: IProduct;
};

type State = {};

export class ProductCard extends Component<Props, State> {
  render() {
    return (
      <Card style={{ width: "12rem" }}>
        <Card.Img variant="top" src={this.props.product.imageUrl} width={500} />
        <Card.Body>
          <Card.Title>{this.props.product.title}</Card.Title>
          <Card.Text>{this.props.product.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          RM {Number(this.props.product.price).toFixed(2)}
        </Card.Footer>
      </Card>
    );
  }
}
