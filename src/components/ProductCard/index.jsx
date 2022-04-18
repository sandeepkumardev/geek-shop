import Button from "geeky-ui/core/Button";
import IconButton from "geeky-ui/core/IconButton";
import Typography from "geeky-ui/core/Typography";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import CheckExist from "../../utils/CheckExistOrNot";
import DiscountRate from "../../utils/DiscountRate";
import RatingStars from "../RatingStars";
import "./productCard.scss";

const ProductCard = ({ product }) => {
  const {
    product_name,
    originalPrice,
    price,
    product_img,
    rating,
    rating_users,
  } = product;
  const [existInCart, setExistInCart] = React.useState(false);
  const [existInWishlist, setExistInWishList] = React.useState(false);

  const { dispatch, store } = useAppContext();
  const { wishList, cart } = store;

  //calculate the discount rate
  const discount = DiscountRate({ originalPrice, price });

  const cartHandler = () => {
    !existInCart ? dispatch({ type: "addToCart", payload: product }) : dispatch({ type: "removeFromCart", payload: product.id })
  }

  React.useEffect(() => {
    // check if the product is already in the wish list
    setExistInWishList(CheckExist({ arr: wishList, id: product.id }))
    setExistInCart(CheckExist({ arr: cart, id: product.id }))
  }, [cart, product.id, wishList])

  return (
    <div className="GsProductCard">
      <div className="GsProductCard__image">
        <img src={product_img} alt={product_name} />
      </div>
      <IconButton color="primary" className="addToWishList" onClick={() => dispatch({ type: "addToWishList", payload: product })}>
        <i className={`${existInWishlist ? 'fa' : 'far'} fa-heart`}></i>
      </IconButton>
      <div className="GsProductCard__info">
        <div className="GsProductCard__name">
          <Typography variant="h6">{product_name}</Typography>
        </div>
        <div className="GsProductCard__rating">
          <RatingStars rating={rating} />
          <Typography variant={"subtitle1"}>{rating_users}</Typography>
        </div>
        <div className="GsProductCard__price">
          <Typography variant="h6">₹{price}</Typography>
          <Typography variant="subtitle1">₹{originalPrice}</Typography>
          <Typography variant="subtitle1">({discount}% off)</Typography>
        </div>
      </div>
      <Button
        variant="contained"
        fullWidth
        {...existInCart ? { color: "secondary", className: "addToCartBtn" } : { className: "GsPrimaryBtn--light addToCartBtn" }}
        onClick={cartHandler}
      >
        {!existInCart ? 'Add to ' : 'Remove from '} Cart
      </Button>
    </div>
  );
};

export default ProductCard;
