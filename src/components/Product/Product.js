import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import ProductImage from '../ProductImage/ProductImage';
import ProductForm from './ProductForm';

const Product = ({title, basePrice, colors, sizes, name }) => {

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

  

  const getPrice = useMemo(() => {
    console.log('Cena została zmieniona')
    const clickedSize = sizes.find(element => element.name === currentSize)
    return basePrice + clickedSize.additionalPrice;
  }, [currentSize, basePrice, sizes]);

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Summary')
    console.log('=====================')
    console.log('Name: ' + title)
    console.log('Price: ' + getPrice)
    console.log('Size: ' + currentSize)
    console.log('Color: ' + currentColor)
  }

  return (
    <article className={styles.product}>
      <ProductImage name={name} title={title} currentColor={currentColor} />
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {getPrice}$</span>
        </header>
        <ProductForm handleSubmit={handleSubmit} sizes={sizes} colors={colors} currentColor={currentColor} currentSize={currentSize} setCurrentColor={setCurrentColor} setCurrentSize={setCurrentSize} />
      </div>
    </article>
  )
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired,
};

export default Product;