import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import dataToppings from '../data/toppings.json';
import { useState } from 'react';

const DetailPage = () => {
  const params = useParams();
  const history = useHistory();
  const [getTopping, setGetTopping] = useState([]);
  const [getPriceTopping, setGetPriceTopping] = useState([]);

  const dataAllCoffee = JSON.parse(localStorage.getItem('all_coffee'));
  const getDataUserTransaction = JSON.parse(localStorage.getItem('user_transaction'));

  const findAllCoffee = dataAllCoffee.find((data) => data.id === params.id);
  const parsingPrice = parseInt(findAllCoffee.price)
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g)
    .join('.')
    .split('')
    .reverse()
    .join('');

  const IMG_URL = '/images/coffee/';
  const IMG_URL_TOPPINGS = '/images/toppings/';

  const handlerAddCart = () => {
    getDataUserTransaction.order.push({
      name: findAllCoffee.name,
      price: parseInt(findAllCoffee.price),
      image: findAllCoffee.image,
      topping: getTopping,
      priceTopping: getPriceTopping,
    });
    localStorage.setItem('user_transaction', JSON.stringify(getDataUserTransaction));
    history.push('/cart-page');
    window.location.reload();
  };

  useEffect(() => {
    const selectToppings = document.querySelectorAll('.checkbox');
    let toppingArray = [];
    let toppingPrice = [];
    for (let checkbox of selectToppings) {
      checkbox.addEventListener('click', function () {
        if (this.checked === true) {
          toppingArray.push(this.name);
          toppingPrice.push(parseInt(this.value));
          setGetTopping(toppingArray);
          setGetPriceTopping(toppingPrice);
        } else {
          console.log('you unchecked');
        }
      });
    }
  }, []);

  const listToppings = dataToppings.map((topping) => {
    return (
      <div className="col-md-3 d-flex flex-column align-items-center">
        <div class="box-check">
          <input
            type="hidden"
            onChange={() => {
              setGetPriceTopping(topping.price);
            }}
          />
          <input type="checkbox" name={`${topping.name}`} value={`${topping.price}`} className="checkbox" />
          <img src={`${IMG_URL_TOPPINGS}${topping.image}`} alt={topping.image} />
          <label for={`${topping.name}`} className="click-topping">
            {topping.name}
          </label>
        </div>
      </div>
    );
  });

  return (
    <>
      <section className="detail-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src={`${IMG_URL}${findAllCoffee.image}`} alt={findAllCoffee.image} />
            </div>
            <div className="col-md-7">
              <h1 className="text-capitalize">{findAllCoffee.name}</h1>
              <p>Rp.{parsingPrice}</p>
              <form onSubmit={handlerAddCart}>
                <div className="toppings mt-3">
                  <div className="row">{listToppings}</div>
                </div>
                <div className="total d-flex justify-content-lg-between mt-2">
                  <h3>Total</h3>
                  <p className="price-total">
                    <h4 className="text-end">Rp.{parsingPrice}</h4>
                  </p>
                </div>
                <button className="btn-total" onClick="">
                  Add Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;