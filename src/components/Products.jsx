import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import ProductService from '../services/product.service';
import CategoryService from '../services/category.service';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CartItem from '../models/item';
import CartService from "../services/cart.service";
import Category from "../models/category";
import store from '../redux/store';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"



const Products = () => {
  const navigate = useNavigate();

  const currentUser = store.getState().user;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [categorie, setCategorie] = useState([]);
  // //////////////
  // extra
  // ///////////
  const [sortedState, setSortedState] = useState(0);
  const [sortedArr, setSortedArray] = useState([]);
  // const [sortedArr, setSortedArray] = useState("");
  const [filteredObject, setFilteredObject] = useState([]);
  const [finallyFiltered, setFinallyFiltered] = useState([])
  const [newUI, setNewUI] = useState(false)
  const [searchState, setSearchState] = useState(false)
  ////////////////
  let componentMounted = true;
  const BASE_URL = "http://localhost:8080/products/";

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
    if (!currentUser) {
      toast.success("You should Login First", { autoClose: 1500 });
      navigate('/login')
      return;
    }
    const item = new CartItem(1, currentUser.id, product.id);
    CartService.addToCart(item).then((resp) => {
      toast.success("Item Added To Cart", { autoClose: 1500 });
    });
  }


  //Fetched Data From Backend// Display
  useEffect(() => {
    ProductService.getAllProducts().then((response) => {
      setData(response.data);
      setFilter(response.data);
      setLoading(false);
    });

    CategoryService.getAllCategories().then((response) => {
      setCategorie(response.data);
    });

  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center" >
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };


  const filterProduct = (id) => {
    ProductService.getProductsByCategory(id).then((response) => {
      setFilter(response.data)
    });

  }


  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-3" style={{ backgroundColor: "#000000" }}>
          <button className="btn btn-outline-light btn-lg m-2" style={{ fontSize: "1.5rem" }} onClick={() => setFilter(data)}>All</button>
          {categorie.map((cat) => {
            const name = cat.categoryName;
            console.log(BASE_URL + cat.id);
            return <button className="btn btn-outline-light btn-lg m-2" style={{ fontSize: "1.5rem" }} onClick={() => filterProduct(cat.id)}>{cat.categoryName}</button>
          })}

        </div>

        {filter.map((product) => {
          return (

            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={BASE_URL + product.id + '/image'}//src={product.image}

                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {/* {product.title.substring(0, 12)}...  */}
                    {product.name.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs. {product.price}</li>

                </ul>
                <div className="card-body">

                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };

  ////////////////////////////////
  // Sorting
  // ////////////////////////
  let numArr = []; //the array which just includes prices as Number
  let sortedObj = [];
  function sortObj(obj) {
    // let numArr = []; //the array which just includes prices as Number
    // let sortedObj = [];
    obj.map((x) => {
      numArr.push(Number(x["price"]));
    });

    while (numArr.length > 0) {
      let minIndex = numArr.indexOf(Math.min(...numArr)); //the index of cheapest home in the obj
      numArr.splice(minIndex, 1);
      sortedObj.push(obj.splice(minIndex, 1)); // splicing cheapest home from Homes Array to sortedObj Array.
    }

    console.log(sortedObj);
    setSortedArray(sortedObj);
  }

  function highObj(obj) {
    // let numArr = []; //the array which just includes prices as Number
    // let sortedObj = [];
    obj.map((x) => {
      numArr.push(Number(x["price"]));
    });

    while (numArr.length > 0) {
      let minIndex = numArr.indexOf(Math.max(...numArr)); //the index of cheapest home in the obj
      numArr.splice(minIndex, 1);
      sortedObj.push(obj.splice(minIndex, 1)); // splicing cheapest home from Homes Array to sortedObj Array.
    }

    console.log(sortedObj);
    setSortedArray(sortedObj);
  }

  function setFinalProductsArray(arr) {
    const filteredProducts = []
    arr.map(items => {
      // console.log(items)

      items.map(item => {
        console.log(item)
        // finallyFiltered.push(item)
        filteredProducts.push(item)
      })
      setFinallyFiltered(filteredProducts)
      setFilter(filteredProducts)
    })
  }

 

  function lowtohigh() {
    ProductService.getAllProducts().then((response) => {
      // setData(response.data);
      sortObj(response.data);
      setFinalProductsArray(sortedArr);


      // setFilter(response.data);
      // setLoading(false);
    });

    CategoryService.getAllCategories().then((response) => {
      setCategorie(response.data);
    });
  }
  function hightolow() {
    ProductService.getAllProducts().then((response) => {
      // setData(response.data);
      highObj(response.data);
      setFinalProductsArray(sortedArr);
      // setFilter(filteredProducts)

      // setFilter(response.data);
      // setLoading(false);
    });

    CategoryService.getAllCategories().then((response) => {
      setCategorie(response.data);
    });
  }
  // function hightolow() {
  //   highObj(data);
  //   setFinalProductsArray(sortedArr); 
  // }

  function backToOriginal() {
    ProductService.getAllProducts().then((response) => {
      setData(response.data);
      setFilter(response.data);
      setLoading(false);
    });

    CategoryService.getAllCategories().then((response) => {
      setCategorie(response.data);
    });


  }

  // //////////////////////////////////////////////
  //Implementing Search
  // ///////////////////////////////////////////
  const searchText = (e) => {
    console.log(data);
    console.log(filter);
    // console.log(e);
    // const filteredObjectArr = [];
    const inpt = e.target.value;
    // console.log(inpt);
    const productsFilterd = data.filter((value) => value.name == inpt);
    // console.log(productsFilterd);
    setFilteredObject(productsFilterd);
    if (productsFilterd.filter((value) => value.name == inpt).length > 0) {
      console.log("true");
      setSearchState(true)
      // console.log(value);
      // setFilter(productsFilterd);
    } else {
      setSearchState(false)
      console.log("false");
    }
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <div className="search-bar">
              <input type="text" class="input-group-text" id="inputGroup-sizing-lg" onChange={searchText} />
              {filteredObject.length !== 0 ?
                filteredObject.map((product) => {
                  return (
                    <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                      <div className="card text-center h-100" key={product.id}>
                        <img
                          className="card-img-top p-3"
                          src={BASE_URL + product.id + '/image'}//src={product.image}

                          alt="Card"
                          height={300}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {/* {product.title.substring(0, 12)}...  */}
                            {product.name.substring(0, 12)}...
                          </h5>
                          <p className="card-text">
                            {product.description.substring(0, 90)}...
                          </p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item lead">Rs. {product.price}</li>

                        </ul>
                        <div className="card-body">

                          <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
                : (<p style={{ color: 'grey' }}>{"Search product..."}</p>)}

              <div class="dropdown">
                <button class="dropbtn">Filter</button>
                <div class="dropdown-content">
                  <Link to="" onClick={lowtohigh}>
                    low
                  </Link>
                  <Link to="" onClick={hightolow}>high</Link>
                  <Link to="" onClick={backToOriginal}>
                    back
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
