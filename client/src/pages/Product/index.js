import React , {useState} from 'react';
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
  const { category, productID } = useParams();
  const [brideName, setBrideName] = useState("Bride");
  const [groomName, setGroomName] = useState("Groom");
  const [invitationDate, setInvitationDate] = useState("January, 1st 2099");
  const [invitationTime, setInvitationTime] = useState("12:00 AM");
  const [invitationLocation, setInvitationLocation] = useState("123 Fake Street");
  const [addProd, {error}] = useMutation(ADD_PROD)
  const [addOrder, {error: error2}] = useMutation(ADD_ORDER)
  const [deleteProd, {error: error3}] = useMutation(DELETE_PROD)
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCTS, {variables: {"id": productID}});

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
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  
     
  document.addEventListener('readystatechange', event => {
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){dragElement(field)});
    
    
    if (data) {
      console.log(data.product);
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
      if (data.product.mods){
        data.product.mods.forEach(mod=>{
          
          document.getElementById(mod.element_id).style.top = mod.posTop
          document.getElementById(mod.element_id).style.left = mod.posLeft
        });
      }
    }
  });
  
  async function invitationSave(event) {
    const textfields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = {
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/stuff.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Invitations"
      },
      textFields: textfields,
      mods: mods
    }
    const urlRedirect = `http://${window.location.host}/products/invitation/`
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });
    window.location.replace(urlRedirect + data.addProduct._id)
  }

  async function guestlistSave(event) {
    const textfields = []
    const multifields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const multifieldids = categoryComponents[category].categories
    multifieldids.forEach(id =>{
      multifields.push({group:`table${id}members`, fields:Array.from(document.getElementById(`table${id}members`).children, ({textContent}) => textContent)})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = {
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/stuff.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Guest List"
      },
      textFields: textfields,
      groupFields: multifields,
      mods: mods
    }
    const urlRedirect = `http://${window.location.host}/products/guestlist/`
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });
    window.location.replace(urlRedirect + data.addProduct._id)
  }

  async function menuSave(event) {
    const textfields = []
    const multifields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const multifieldids = categoryComponents[category].categories
    multifieldids.forEach(id =>{
      multifields.push({group:`${id.toLowerCase()}list`, fields:Array.from(document.getElementById(`${id.toLowerCase()}list`).children, ({textContent}) => textContent)})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = {
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/stuff.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Menu"
      },
      textFields: textfields,
      groupFields: multifields,
      mods: mods
    }
    const urlRedirect = `http://${window.location.host}/products/menu/`
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });

    window.location.replace(urlRedirect + data.addProduct._id)
  }
  
  async function thankyouSave(event) {
    const textfields = []
    const mods = []
    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const draggableFields = document.getElementsByClassName('draggableField');
    Array.prototype.forEach.call(draggableFields, function(field){
      mods.push({element_id:field.id, posTop: field.style.top, posLeft: field.style.left})  
    });
    const product = {
      name: document.getElementById('productName').innerText,
      description: document.getElementById('productDescirption').innerText,
      image: "/images/stuff.png",
      price: parseFloat(document.getElementById('productPrice').innerText),
      category: {
        name: "Thank You Card"
      },
      textFields: textfields,
      mods: mods
    }
    const urlRedirect = `http://${window.location.host}/products/thankyou/`
    if(productID) {
      const { data } = await deleteProd({
        variables: {productID: productID},
      });
    }
    const { data } = await addProd({
      variables: {...product },
    });
    console.log(urlRedirect + data.addProduct._id);
    window.location.replace(urlRedirect + data.addProduct._id)
  }
  
  async function cartHandler(event){
    const { data } = await addOrder({
      variables: {
        productId: productID, 
        orderQuantity: parseInt(document.getElementById("productQuantity").value),
        status: "PENDING" 
      },
    });
    console.log(data);
  }

  function setBrideGroomInput(event) {
    if (event.target.id === 'bride') {
      setBrideName(event.target.value);
    }else{
      setGroomName(event.target.value);
    }
  }

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
        names: ["White Green Watercolor Guest List"],
        descriptions:["A subtle, watercolor inspired card with muted greens and a white background"],
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
        categories: [1,2,3,4,5,6,7,8],
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
        names: ["Black and White Caligraphy Thank You Card"],
        descriptions:["Infused with gratitude and elegance, this Handwritten Luxury Wedding Thank You Card features beautiful calligraphy on high-quality paper, offering a thoughtful and stylish way to express your appreciation to your guests."],
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