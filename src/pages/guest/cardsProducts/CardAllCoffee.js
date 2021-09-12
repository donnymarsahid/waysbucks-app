import React from 'react';
import convertRupiah from 'rupiah-format';

const CardAllCoffee = ({ coffee }) => {
  const parsingPrice = convertRupiah.convert(coffee.price);

  return (
    <>
      <div className="col-md-3 mb-4">
        <div className="box-card">
          <div className="image-card">
            <img src={`${coffee.image}`} alt={coffee.image} />
            <div className="overlay d-flex justify-content-center align-items-center">
              {coffee.status === 'not available' ? (
                <button data-bs-toggle="modal" data-bs-target="#exampleModalNotAvailable">
                  Not Available
                </button>
              ) : (
                <button data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
                  ORDER NOW
                </button>
              )}
            </div>
          </div>
          <div className="description">
            <h5 className="text-capitalize">{coffee.title}</h5>
            <p>{parsingPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardAllCoffee;
