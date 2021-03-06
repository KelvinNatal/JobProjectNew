import './style.css';
import React from 'react';
import { useEffect, useState} from "react";
import { Link } from 'react-router-dom';

const Body = () => {

  const [products, setProducts] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    message: ''
})

    
  const getProducts = async () => {    
    await fetch("https://jobphp.herokuapp.com/index.php",{
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.records === null){
        document.getElementById("card").innerHTML = 
        `
          <div></div>
        `
      }else{
        setProducts(responseJson.records)
      }      
    });  
};

  const deleteProduct = async () => {
    let arrayids=[];
    Object.values(products).forEach(product=>{
        if(product.select){
          arrayids.push(product.id);
        }       
      });
      await fetch("https://jobphp.herokuapp.com/index.php?id=" + arrayids,{
        method: 'DELETE'       
      })
      .then((response) => response.json())
      .then((responseJson) => {        
        console.log(responseJson);  
        if(responseJson.erro){
          setStatus({
              type: 'erro',
              message: responseJson.message
          })
       } 
        getProducts();          
      })
    }  


  useEffect(() => {
    getProducts();
  },[])

    return (
      <>
      <header className="head">
        <nav className="navbar bg-light">
        {status.type === 'erro'?<div className="serror">{status.message}</div> : ""} 
            <div className="container cont">
                 <p className="navbar-brand product">Product List</p>
                    <div className="d-flex">
                        <Link to="/addproduct"><button className="btn btn-outline-dark button" type="submit">ADD</button></Link>
                        <button id="delete-product-btn" className="btn btn-danger" onClick={() => (deleteProduct())} type="submit">MASS DELETE</button>
                    </div>
                </div>
                </nav>
                <div className="d-flex justify-content-center">
            <hr size="5" className="hr-weigh"/>
        </div>
        </header>
        <div id="card" className="container">
           <div className='row'>
           {typeof products !== "undefined" &&
              Object.values(products).map((product) => {    

                const validate = () => {
                    while(product.size !== null && product.weight == null && product.height == null){
                      return `Size: ${product.size} MB`;
                    }
                    while(product.weight !== 0 && product.height == null){
                      return `Weight: ${product.weight} KG`;
                    }                   
                    return `Dimension: ${product.height}x${product.width}x${product.length}`; 
                }

               return(
                  <div className="col-sm-6 col-lg-3 col-xl-3 mb-5 colum" key={product.id}>      
                      <div className="card border-dark mb-3 card">
                      <div className="check">
                      <input className='delete-checkbox' onChange={event=>{
                          let checked = event.target.checked;
                          setProducts(Object.values(products).map(data =>{
                              if(product.id === data.id){
                                data.select = checked;
                              }
                              return data;
                            })
                          )}} checked={product.select} type="checkbox" value={product.id}  />
                          <label className="form-check-label"/>
                      </div>
                    <div className="card-body text-dark width">
                      <p className="card-text">{product.sku}</p>
                      <p className="card-text">{product.name}</p>
                      <p className="card-text">{product.price} $</p>
                      <p className="card-text">{validate()}</p>
                    </div> 
              </div>
       </div>   
       );         
      })}  
        </div>
      </div>
      </>
    );
  };

export default Body;