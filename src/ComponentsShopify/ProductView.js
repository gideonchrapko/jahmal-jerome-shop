import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useSpring } from 'react-spring'
import { useShopify } from "../hooks";

import background from '../Assets/Wall-01min.png'
import Arrow from '../Assets/imgArrow.svg'

export default (props) => {
	const {
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()
	const id = props.match.params.productId
	const defaultSize = product.variants && product.variants[0].id.toString()
	const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
	const [ imageIndex, setImageIndex ] = useState(0)

	const [sizeTitle, setSizeTitle] = useState("")
	const [rotate, setRotate] = useState()
	const [dropDownMenu, setdropDownMenu] = useState(false);

	const description = product.description && product.description.split(".")
	const imgIndexLength = product.images && product.images.length - 1

	const rotationAnimation = useSpring({
		transform: !rotate ? `rotate(0deg)` : `rotate(180deg)`,
	});

    const dropDownMenuAnimation = useSpring({
      opacity: dropDownMenu ? 1 : 0,
      transform: dropDownMenu ? `translateY(0) scaleY(1)` : `translateY(-130%) scaleY(0)`
    }); 

	function changeSize(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		}
	}

	function clickFunction(item, i) {
		if (item.available) {
			setSize(item.id.toString());
			setSizeTitle(item.title);
			setRotate(!rotate);
			setdropDownMenu(!dropDownMenu);
		} else {
			return
		}
	}

	console.log(quantity)

	useEffect(() => {
		fetchProduct(id)
	}, [id])

	function handleClickRight() {
		if(imageIndex < imgIndexLength) {
			setImageIndex(imageIndex + 1)
		} else {
			setImageIndex(0)
		}
	}

	function handleClickLeft() {
		if(imageIndex !== 0){
			setImageIndex(imageIndex - 1)
		} else {
			setImageIndex(imgIndexLength)
		}
	}

	return (
		<Container fluid id="individualProduct" style={{ backgroundImage: `url(${background})` }}>
			<Row className="product-wrapper2">
				<Col 
					className="prod-image-container"
					lg={{ span: 5, offset: 1 }}
					md={{ span: 10, offset: 1 }}
					// style={{ backgroundColor: "green" }}
				>
					<div 
						className="prod-img-div"
						style={{ 
							backgroundImage: `url(${product.images && product.images[imageIndex].src})`
						}}
						alt={`${product.title} product shot`}
					>
					</div>
						<div className="column">
							<img 
								onClick={() => handleClickRight()}
								src={Arrow} 
								alt="View previous image to the left"
								className="prod-arrow"
								style={{ width: "50%", transform: "rotate(180deg)" }}
							/>
						</div>
						<div className="column">
							<img 
								onClick={() => handleClickLeft()}
								src={Arrow} 
								style={{ width: "50%" }}
								alt="View previous image to the left"
								className="prod-arrow"
						/>	
						</div>
				</Col>
				<Col 
					className="prod-info-contianer" 
					lg={{ span: 5, offset: 0 }}
					md={{ span: 10, offset: 1 }}
				>
					<h2 className="Product__sectionHeader">{product.title}</h2>
					<h3 className="Product__price">
						${product.variants && product.variants[0].price}
					</h3>
					<div style={{ width: "50%", float: "left" }}>
						<h2 className="subhead_prod" >SIZE</h2>
							<div className="prodQuantity-container horizontal-list">
								<ul className="prod-size-container-list">
									{product.variants &&
										product.variants.map((item, i) => {
											return (
												<li
													onClick={e => {
														clickFunction(item, i)
													}}
													// className={item.available ? "size__option" : "size__option2" }	
													className="prod-list-item"
													key={item.title + i}
												>
													<a className="prod-listitem-anchor" style={{ backgroundColor: `${i % 2 == 0 ? "white" : "#FFE6E6"}`, borderRadius: "10px"}}>
														{`${item.title}`}
													</a>
												</li>	
											)
										})}

									</ul>
							</div>
							
							
							{/* <div className="prodQuantity-container" >
								<div 
									className="style__dropdown" 
									id="prodOptions" 
									onClick={e => {
										setdropDownMenu(!dropDownMenu);
										setRotate(!rotate);
									}}>
									{sizeTitle ? sizeTitle : "Size"}
									<animated.img src={DropDownArrow} alt="drop down arrow" style={rotationAnimation} className="dropDownArrow"/>
								</div>
								<animated.div className="style__dropdownDiv" style={dropDownMenuAnimation}>	
								{product.variants &&
								product.variants.map((item, i) => {
									return (
										<option
											value={item.id.toString()}
											key={item.title + i}
										>{`${item.title}`}</option>
									)
								})}
									{product.variants &&
										product.variants.map((item, i) => {
											return (
												<li
													onClick={e => {
														clickFunction(item, i)
													}}
													className={item.available ? "size__option" : "size__option2" }												
													key={item.title + i}
												>{`${item.title}`}</li>	
											)
									})}
								</animated.div>	
							</div>

						{product.variants &&
							product.variants.map((item, i) => {
								return (
									<li
										onClick={e => {
											clickFunction(item, i)
										}}
										className={item.available ? "size__option" : "size__option2" }												
										key={item.title + i}
									>{`${item.title}`}</li>	
								)
						})} */}
					</div>
					<div style={{ width: "50%", float: "right" }}>
						<h2 className="subhead_prod">QUANTITY</h2>
						<div>
							<div className="prodQuantity-container">
								{ quantity > 1 ?
										<button
											className="prodQuantity-update"
											onClick={() =>
												setQuantity(quantity - 1)
									}
										>
											-
										</button> :
										<button
											className="prodQuantity-update"
										>
											-
										</button>
									}
										<span className="prodQuantity">
											{quantity}
										</span>
										<button
											className="prodQuantity-update"
											onClick={() =>
												setQuantity(quantity + 1)
									}
										>
											+
										</button>
									</div>
							</div>
					</div>
					<div>
						{product.availableForSale ?
							<button
								className="prodBuyButton"
											// this needs to be different for a product with no variant
								onClick={(e) => changeSize(size, quantity)}
							>
								Add to Cart
							</button> :
							<button
								className="prodBuyButtonSold"
							>
								Sold Out
							</button>
						}
					</div>
					<div>
						<ul className="Product__description">
							{description &&
								description.map((each, i) => {
									return <li style={{ left: "-15px"}} key={`line-description +${i}`}>{each}</li>
								})}
						</ul>
					</div>
					{/* <div>
						<label htmlFor={"prodOptions"}>Size</label>
						<select
							id="prodOptions"
							name={size}
							onChange={(e) => {
								setSize(e.target.value)
							}}
						>
							{product.variants &&
								product.variants.map((item, i) => {
									return (
										<option
											value={item.id.toString()}
											key={item.title + i}
										>{`${item.title}`}</option>
									)
								})}
						</select>
					</div> */}

					{/* <div>
						<label>Quantity</label>
						<input
							className="quantity"
							type="number"
							min={1}
							value={quantity}
							onChange={(e) => {
								setQuantity(e.target.value)
							}}
						></input>
					</div> */}

				</Col>
			</Row>
		</Container>
	)
}