import React from 'react'
import { Footer } from "../components";
const AboutPage = () => {
  return (
    <>
   
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
        {/* E-commerce websites have become an integral part of our lives, offering convenience and accessibility. They enable us to explore and purchase products from the comfort of our homes, eliminating the need to visit physical stores. This convenience has made online shopping a preferred choice for many, providing a wide range of options and hassle-free shopping experiences.
        Urbankart is like an online store where you can buy all sorts of things easily. We have lots of different products for you to choose from, like clothes and gadgets. You can trust that our website is safe to use, and we'll make sure your purchases get to you quickly. If you ever need help, our friendly customer support team is here for you. Whether you're a regular online shopper or trying it out for the first time, our website makes shopping online simple and enjoyable. Come visit us and discover a better way to shop online! */}
        Welcome to UrbanKart, your ultimate destination for stylish and contemporary women's clothing in India. We celebrate the vibrant spirit of modern Indian women by offering a diverse range of apparel that combines tradition with modernity. From elegant ethnic wear to trendy western outfits, our collection meets the fashion needs of women across all walks of life. Our designs reflect the latest trends while ensuring comfort and quality. We strive to provide a seamless shopping experience, both online and in-store, with personalized styling advice and exceptional customer service. Our mission is to empower women to look and feel their best. Thank you for choosing UrbanKart as your fashion partner.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
         <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://th.bing.com/th/id/OIP.c0VV0LC-VwNvGhpKb_dFVgHaJ6?rs=1&pid=ImgDetMain" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Sarees</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://i.pinimg.com/736x/19/94/dc/1994dcfaa0f21ffa92bd74148b805e55.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Western Wear</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://i.pinimg.com/736x/36/3f/17/363f17f244a0fb4bc6bb5a1a59d00da5.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Kurtis</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://i.pinimg.com/736x/6e/34/bd/6e34bd74ffdda26ecb9561db52191b06.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Suits</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage