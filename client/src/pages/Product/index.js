import React , {useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import {useQuery, useMutation } from '@apollo/client';
import { ADD_PROD, ADD_ORDER, DELETE_PROD  } from '../../utils/mutations'
import { QUERY_SINGLE_PRODUCTS } from '../../utils/queries'
import {dragElement} from "../../utils/draggable"
import Invitation from "../../components/Invitation"
import GuestList from "../../components/GuestList"
import Menu from "../../components/Menu"
import ThankYou from "../../components/ThankYou"
import ModificationMenu from "../../components/ModificationMenu"
import {handleGuestSubmit} from "../../utils/guestHandlers"
import {handleMenuSubmit} from "../../utils/menuHandlers"
import './index.scss';
import { useParams } from 'react-router-dom';

function Product() {
  const { category, productID } = useParams(); // get the category and optional product ID parameter
  // state handeling for fields
  const [brideName, setBrideName] = useState("Bride");
  const [groomName, setGroomName] = useState("Groom");
  const [invitationDate, setInvitationDate] = useState("January, 1st 2099");
  const [invitationTime, setInvitationTime] = useState("12:00 AM");
  const [invitationLocation, setInvitationLocation] = useState("123 Fake Street");
  // mutations to add products and orders to user
  const [addProd, {error}] = useMutation(ADD_PROD)
  const [addOrder, {error: error2}] = useMutation(ADD_ORDER)
  const [deleteProd, {error: error3}] = useMutation(DELETE_PROD) // delete a product used to replace saved products

  // if the optional productid parameter is provided we pull the product
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCTS, {variables: {"id": productID}});
  // using react router to reroute
  const navigate = useNavigate()
  
  // states and setter to be passed to child components
  const setters = {
    bride:setBrideName, 
    groom:setGroomName, 
    date:setInvitationDate, 
    time:setInvitationTime, 
    location:setInvitationLocation
  }
  const states = {
    bride:brideName, 
    groom:groomName, 
    date:invitationDate, 
    time:invitationTime, 
    location:invitationLocation
  }
  // check if we are waiting to retrieve the product and if so present user with loading message
  if (loading){
    return <div><h1>Loading...</h1></div>
  }
  
  document.addEventListener('readystatechange', event => {
    // get all fields that should be draggable and add event listners to track their movement
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){dragElement(field)});
    
    // if there is product data then update the state of the fields
    if (data) {
      data.product.textFields.forEach(textfield=>{
        setters[textfield.label](textfield.input)
      });
      if (data.product.groupFields){
        data.product.groupFields.forEach(groupField=>{

          const id = groupField.group
          document.getElementById(id).innerHTML = '';
          groupField.fields.forEach(field=>{
            let newGuest = document.createElement("li");
            newGuest.innerText = field
            document.getElementById(id).appendChild(newGuest)
          });
        });
      }
      if (data.product.mods){ // if position data is provided in product update the positions
        data.product.mods.forEach(mod=>{
          
          document.getElementById(mod.element_id).style.top = mod.posTop
          document.getElementById(mod.element_id).style.left = mod.posLeft
        });
      }
    }
  });
  
  // handler for when user saves an invitation
  async function invitationSave(event) {
    // this handler will get the value and position of all fields
    const textfields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{ // getting text fields and their value
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){ // get position data
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = { // creating product object
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/White-Green-Watercolor-Floral-Border-Wedding-Invitation-no-text.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Invitations"
      },
      textFields: textfields,
      mods: mods
    }
    // if there is an existing product then replace with the new product
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });
    navigate(`/products/invitation/${data.addProduct._id}`)

    alert("Product has been saved") 
  }
  // handler for when user saves an guest list
  async function guestlistSave(event) {
    const textfields = []
    const multifields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields // getting text fields and their value
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const multifieldids = categoryComponents[category].categories // getting multi fields and their value
    multifieldids.forEach(id =>{
      multifields.push({group:`table${id}members`, fields:Array.from(document.getElementById(`table${id}members`).children, ({textContent}) => textContent)})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){ // get position data
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = { // creating product object
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/White-Green-And-Black-Floral-Wedding-Seating-Chart-no-text.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Guest Lists"
      },
      textFields: textfields,
      groupFields: multifields,
      mods: mods
    }
     // if there is an existing product then replace with the new product
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });
    navigate(`/products/guestlist/${data.addProduct._id}`);
    alert("Product has been saved") 
  }
  // handler for when user saves an menu
  async function menuSave(event) {
    const textfields = []
    const multifields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields // getting text fields and their value
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const multifieldids = categoryComponents[category].categories // getting multi fields and their value
    multifieldids.forEach(id =>{
      multifields.push({group:`${id.toLowerCase()}list`, fields:Array.from(document.getElementById(`${id.toLowerCase()}list`).children, ({textContent}) => textContent)})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){ // get position data
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = { // creating product object
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/Floral-Botanical-Wedding-Menu-no-text.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Menus"
      },
      textFields: textfields,
      groupFields: multifields,
      mods: mods
    }
     // if there is an existing product then replace with the new product
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });

    navigate(`/products/menu/${data.addProduct._id}`);
    alert("Product has been saved") 
  }
  // handler for when user saves an thank you card
  async function thankyouSave(event) {
    const textfields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields // getting text fields and their value
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){ // get position data
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = { // creating product object
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/Green-Floral-Watercolor-Thank-You-Card-no-text.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Thank You Cards"
      },
      textFields: textfields,
      mods: mods
    }
     // if there is an existing product then replace with the new product
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });
    navigate(`/products/thankyou/${data.addProduct._id}`);
    alert("Product has been saved") 
  }
  
  // handle add to cart event
  async function cartHandler(event){
    if(!document.getElementById("productQuantity").value){
      alert("Product quantity must be specified") 
      return false
    } 
    const { data } = await addOrder({ // call addorder mutation and set it's status to pending
      variables: {
        productId: productID, 
        orderQuantity: parseInt(document.getElementById("productQuantity").value),
        status: "PENDING" 
      },
    });
    alert("Product has been added to cart") 
  }
  // set state for products fields
  function setBrideGroomInput(event) {
    if (event.target.id === 'bride') {
      setBrideName(event.target.value);
    }else{
      setGroomName(event.target.value);
    }
  }
  // set state for products fields
  function setInvitation(event) {
    if (event.target.id === 'bride') {
      setBrideName(event.target.value);
    }else if (event.target.id === 'groom') {
      setGroomName(event.target.value);
    }else if (event.target.id === 'date') {
      setInvitationDate(event.target.value);
    }else if (event.target.id === 'time') {
      setInvitationTime(event.target.value);
    }else if (event.target.id === 'location') {
      setInvitationLocation(event.target.value);
    }
  }
// data for each product component
  const categoryComponents = {
    invitation:{
        type: "invitation",
        names: ["White Green Watercolor Invitation Card"],
        descriptions:["A subtle, watercolor inspired card with muted greens and a white background"],
        prices:[1.99],
        component: <Invitation 
          brideState={brideName} 
          groomState={groomName}
          invitationDate={invitationDate} 
          invitationTime={invitationTime}
          invitationLocation={invitationLocation}  
          />,
        textfields: ['bride', 'groom', 'date', 'time', 'location'],
        textfieldslabel:"Wedding Details",
        multifields: [],
        multifieldslabel:"",
        category:'',
        categories: [],
        handlers: false,
        handleSave: invitationSave,
        setter: setInvitation
    },
    guestlist: {
        type: 'guestlist',
        names: ["White Green Floral Wedding Seating Chart"],
        descriptions:["This chart, designed for six tables, boasts a clean white backdrop adorned with hand-painted green floral illustrations, seamlessly merging elegance and functionality for your memorable celebration."],
        prices:[5.99],
        component: <GuestList 
          brideState={brideName} 
          groomState={groomName} 
          />,
        textfields: ['bride', 'groom'],
        textfieldslabel:"Couple",
        multifields: ['Guest first name', 'Guest last name'],
        multifieldslabel:"Guests",
        category:'table number',
        categories: [1,2,3,4,5,6],
        handlers: handleGuestSubmit,
        handleSave: guestlistSave,
        setter: setBrideGroomInput
    },
    menu: {
        type: 'menu',
        names: ["Floral Botanical Wedding Menu"],
        descriptions:["Featuring elegant illustrations of delicate blooms and lush greenery, this Floral Botanical Wedding Menu is a tasteful accent that turns your meal selection into a work of art."],
        prices:[2.99],
        component: <Menu 
        brideState={brideName} 
        groomState={groomName} 
        />,
        textfields: ['bride', 'groom'],
        textfieldslabel:"Couple",
        multifields: ['item name'],
        multifieldslabel:"Menu Items",
        category:'course',
        categories: ['Appetizers', 'Entrees', 'Deserts'],
        handlers: handleMenuSubmit,
        handleSave: menuSave,
        setter: setBrideGroomInput
    },
    thankyou: {
        type: 'thankyou',
        names: ["Green Floral Watercolor Thank You Card"],
        descriptions:["Discover the Green Floral Watercolor Thank You Card, a vibrant expression of gratitude. This card features lush, hand-painted watercolor illustrations, turning your heartfelt thanks into an enchanting, cherished keepsake."],
        prices:[2.99],
        component: <ThankYou 
        brideState={brideName} 
        groomState={groomName} 
        />,
        textfields: ['bride', 'groom'],
        textfieldslabel:"Thank You Details",
        multifields: [],
        handlers: false,
        handleSave: thankyouSave,
        setter: setBrideGroomInput
    },
  }
  
  return (
    <section>
        <div className="canvas">
            {categoryComponents[category].component}
            <ModificationMenu 
            inputs={categoryComponents[category]} 
            saved={productID? true: false}
            cartHandler={cartHandler}
            states={states}
            />
        </div>
    </section>
  );
}

export default Product;