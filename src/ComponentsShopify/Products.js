import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"


import Product from "./Product"


const Products = (props) => {
  return (
		<Container fluid >
			<Product history={props.history} />
		</Container>
	)
}

export default Products