import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState(localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : []);


  useEffect(() => {
    localStorage.setItem("basket" , JSON.stringify(basket))
  }, [basket])
  

  const productData = () => {
    fetch("https://northwind.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  };

  useEffect(() => {
    productData();
  }, []);

  function addBasket(item) {
    let elementIndex= basket.findIndex((x)=>x.id===item.id)
    console.log(elementIndex);
    if (elementIndex!== -1) {
      const newBasket= [...basket];
      newBasket[elementIndex].count++;
      setBasket(newBasket)
    }
    else{
      setBasket([...basket, {...item,count:1}]);
    }

  }


  function delBasket(id) {
    setBasket(basket.filter((x)=>x.id !==id))
    alert("deqiq silmek isteyirsen?")
    alert("mence acsan silme")
  }

function setCountValue(isAdd,item) {
  let elementIndex= basket.findIndex((x)=>x.id===item.id)
  const newBasket= [...basket];

  if (isAdd) {
    newBasket[elementIndex].count++;
    setBasket(newBasket) 
  }
  else{
    if (newBasket[elementIndex].count>0) {
      newBasket[elementIndex].count--;
      setBasket(newBasket) 
    }
  }
}


  return (
    <div className="App">
      <header>
        <div className="container">
          <img className="header_img" src="https://thumbs.dreamstime.com/b/male-chef-mascot-use-logo-other-food-cheff-character-beverage-216325148.jpg" alt="" />
          <h2>Welcome to my Restaurant</h2>
        </div>
      </header>
      <div className="basket">
        <div className="basket_products">
            {basket.map((item) => (
              <ul className="basket_cards">
                <img src="https://www.papajohns.az/uploads/images/pizza/papamiks-sayt.png" alt="" />
                <li>ID: {item.id}</li>
                <li>Name: {item.name}</li>
                <li>Price: {item.unitPrice}$</li>
                <li><i class="fa-solid fa-basket-shopping"></i>: {item.count}
                <button className="btn add" onClick={()=>setCountValue(true,item)}>+</button>
                <button className="btn del" onClick={()=>setCountValue(false,item)}>-</button>
                </li>
                <i className="fa-solid fa-heart fa-beat"></i>
                <button className="del" onClick={()=>delBasket(item.id)}>Sil getsin</button>
              </ul>
            ))}

        </div>
      </div>
      

      {
        <div className="product_card">
          {product.map((x) => (
            <ul className="products" key={x.id}>
              <img src="https://www.papajohns.az/uploads/images/pizza/papamiks-sayt.png" alt="" />
              <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: {x.unitPrice}$</li>
              <i className="fa-solid fa-heart fa-beat"></i>
              <button onClick={() => addBasket(x)}>Bidene bundan</button>
            </ul>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
