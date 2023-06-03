import React , {useState} from 'react';
import {useQuery, useMutation } from '@apollo/client';
import { ADD_PROD, ADD_ORDER } from '../../utils/mutations'
import { QUERY_SINGLE_PRODUCTS } from '../../utils/queries'
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
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCTS, {variables: {"id": productID}});

  const setters = {
    bride:setBrideName, 
    groom:setGroomName, 
    date:setInvitationDate, 
    time:setInvitationTime, 
    location:setInvitationLocation
  }
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  document.addEventListener('readystatechange', event => {
    if (data) {
      console.log(data.product.textFields);
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
    }
  });
  
  async function invitationSave(event) {
    const textfields = []
    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    console.log(textfields)
    const product = {
      name: "Invitation",
      description: "card",
      image: "/images/stuff.png",
      price: 9.99,
      category: {
        name: "Invitations"
      },
      textFields: textfields
    }
    const { data } = await addProd({
      variables: {...product },
    });
    window.location.assign(`${window.location.href}/${data.addProduct._id}`)
  }

  async function guestlistSave(event) {
    const textfields = []
    const multifields = []

    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const multifieldids = categoryComponents[category].categories
    multifieldids.forEach(id =>{
      multifields.push({group:`table${id}members`, fields:Array.from(document.getElementById(`table${id}members`).children, ({textContent}) => textContent)})
    });
    const product = {
      name: "Guest List",
      description: "card",
      image: "/images/stuff.png",
      price: 10.99,
      category: {
        name: "Guest List"
      },
      textFields: textfields,
      groupFields: multifields
    }
    const { data } = await addProd({
      variables: {...product },
    });
    window.location.assign(`${window.location.href}/${data.addProduct._id}`)
  }

  async function menuSave(event) {
    const textfields = []
    const multifields = []

    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    const multifieldids = categoryComponents[category].categories
    multifieldids.forEach(id =>{
      
      multifields.push({group:`${id.toLowerCase()}list`, fields:Array.from(document.getElementById(`${id.toLowerCase()}list`).children, ({textContent}) => textContent)})
    });
    const product = {
      name: "Menu",
      description: "card",
      image: "/images/stuff.png",
      price: 10.99,
      category: {
        name: "Menu"
      },
      textFields: textfields,
      groupFields: multifields
    }
    const { data } = await addProd({
      variables: {...product },
    });

    window.location.assign(`${window.location.href}/${data.addProduct._id}`)
  }
  
  async function thankyouSave(event) {
    const textfields = []

    const textfieldids = categoryComponents[category].textfields
    textfieldids.forEach(id =>{
      textfields.push({label:id, input:document.getElementById(id).value})
    });
    
    const product = {
      name: "Thank You Card",
      description: "card",
      image: "/images/stuff.png",
      price: 2.99,
      category: {
        name: "Thank You Card"
      },
      textFields: textfields,
    }
    const { data } = await addProd({
      variables: {...product },
    });
    window.location.assign(`${window.location.href}/${data.addProduct._id}`)
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
            />
        </div>
    </section>
  );
}

export default Product;