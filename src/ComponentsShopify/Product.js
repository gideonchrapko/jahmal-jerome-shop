import React from "react"
import { Container, Col, Row } from "react-bootstrap"
import { useShopify } from "../hooks"

export default (props) => {
	const { products, fetchProduct } = useShopify()

	function handleClick(e, product_id) {
		e.preventDefault()
		const id = product_id
		fetchProduct(id).then((res) => {
			props.history.push(`/Product/${res.id}`)
		})
	}

	return (
		<Container className="Product-wrapper">
			{products &&
				products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className="Product" key={product.id + i}>
							{image ? (
								<img
									src={image.src} 
									alt={`${product.title} product shot`} 
									className="product-image"
									onClick={(e) => handleClick(e, product.id)}
									/>
							) : null}
							<Row>
								<Col >
									<h2 className="prod-title-item" >ITEM #</h2>
								</Col>
								<Col>
									<h2 className="prod-title-price">PRICE</h2>								
								</Col>
							</Row>
							<Row>
								<Col >
									<h4 className="Product__title">{product.title}</h4>
								</Col>
								<Col >
									<p className="Product__price">${product.variants[0].price}</p>						
								</Col>
							</Row>
							<button
								className="Product__buy button"
								onClick={(e) => handleClick(e, product.id)}
							>
								View Details
							</button>
						</div>
					)
				})}
		</Container>
	)
}