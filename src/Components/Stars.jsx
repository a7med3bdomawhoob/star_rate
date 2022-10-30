import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import joi from 'joi';
import { startTransition } from 'react';
import './Stars.css';
import { FaStar } from 'react-icons/fa';
export default function Stars() {


  let[rateitem,SetRate]=useState({
    customerId: 6,
    commentTextArea: '',
    chooceProblem: '',
    rate: 0
  });
  
  const[hover,sethover]=useState(null);
  let[evaluate,setevaluate]=useState('');
  let[succedmessage,setsuccesdmessage]=useState('');
  let[validationerror,seterror]=useState([]);
  let[active,setactival]=useState(true);
  

  function validationForm() {
    const schema = joi.object({
      customerId: 6,
      commentTextArea: joi.string().required().max(300).min(6),
      chooceProblem: joi.string().required(),
      rate: joi.number().required().min(1).max(5),
    })

    return schema.validate(rateitem, { abortEarly: false })
}

function reset(e)
{
  SetRate({
    customerId: 6,
    commentTextArea: '',
    chooceProblem: '',
    rate: 0
  })
 document.getElementById('myid').value='';
  console.log("vvvvvvvvvvvvvvvvvvv");
} 


async function addRate(e)
{
   e.preventDefault();
   var valid=validationForm();
   if(valid.error)
   {
       
        seterror(valid.error.details);
       console.log(validationerror);
       
    }

   else{
     let ratingaxios=await axios.post("https://localhost:44325/Rating/SetRate",rateitem);
     console.log(ratingaxios.data);
     setsuccesdmessage("Thanks for your rate sir");
     seterror([]);
     setactival(!active);
     console.log(rateitem);
    reset();
   }
   
}
 function CollectedObject(e)
{
  var newRate={...rateitem};
  let x=e.target.name;
  newRate[x]=e.target.value;
  SetRate(newRate);
  console.log(newRate);
 
}






  return (

 <div className="container  ">
  {validationerror? validationerror.map((error,index) => < div  key={index}  className=' w-50 text-center m-auto my-1 alert alert-danger'>{error.message}</div>):''}
  {succedmessage?<h1 className='message w-50 '>{succedmessage}</h1>:''}
<h2 className='fw-bold w-50  '>FeadBack</h2>
<h4 className='text-center w-50'><div>Your feedback Matters!</div> <div>Help Us Improve The Walmart webSite</div> </h4>
  <form onSubmit={addRate} >

<div className="allstars text-center  w-50 p-2 mb-2">
<label >
<input className='star ' onClick={ CollectedObject}  type="radio"  name='rate'  value={1} />
  <FaStar className='star' size={50} 
    color={1<=(hover||rateitem.rate) ? "#ffc107" :"#e4e5e9"}
    onMouseEnter={()=>sethover(1)}
    onMouseDown={()=>setevaluate("Bad")}
    onMouseLeave={()=>sethover(null)}
  />
</label>
<label >
<input onClick={CollectedObject}  type="radio"  name='rate'  value={2} />
  <FaStar className='star' size={50} 
    color={2<=(hover||rateitem.rate) ? "#ffc107" :"#e4e5e9"}
    onMouseEnter={()=>sethover(2)}
    onMouseDown={()=>setevaluate("poor")}
    onMouseLeave={()=>sethover(null)}
  />
</label>
<label >
<input onClick={CollectedObject}  type="radio"  name='rate'  value={3} />
<FaStar className='star' size={50} 
    color={3<=(hover||rateitem.rate) ? "#ffc107" :"#e4e5e9"}
    onMouseEnter={()=>sethover(3)}
    onMouseDown={()=>setevaluate("medium")}
    onMouseLeave={()=>sethover(null)}
  />
</label> 

<label  >
<input onClick={CollectedObject}  type="radio"  name='rate'  value={4} />
  <FaStar className='star' size={50} 
    color={4<=(hover||rateitem.rate) ? "#ffc107" :"#e4e5e9"}
    onMouseEnter={()=>sethover(4)}
    onMouseDown={()=>setevaluate("good")}
    onMouseLeave={()=>sethover(null)}
  />
</label>
<label >
<input onClick={CollectedObject}  type="radio"  name='rate'  value={5} />
  <FaStar className='star' size={50} 
    color={5<=(hover||rateitem.rate) ? "#ffc107" :"#e4e5e9"}
    onMouseEnter={()=>sethover(5)}
    onMouseDown={()=>setevaluate("Exellent")}
    onMouseLeave={()=>sethover(null)}
  />
</label>
<h6 className='reach'>{evaluate}</h6>
</div>

{rateitem.rate<=3 && rateitem.rate!==0? 
<div className='parentOfAllDivProblems   w-50  '>
  <div className="sorry ">sorre to heare that <i className="text-info fas fa-horse"></i>,what was the problem</div>

<div className="childofproblems text-center">
<div className=' mx-2 '>
<input  type="button" value={"Website experienced"}   onClick={CollectedObject} className='btn bg-black me-2 text-white' name='chooceProblem' />
<input type="button" value={"recent order"}  onClick={CollectedObject} className='btn bg-black me-2 text-white'  name='chooceProblem' />
</div>

<div className='my-2 mx-2'>
<input type="button" value={"customer service"}  onClick={CollectedObject} className= 'btn bg-black me-2 text-white' name='chooceProblem' />
<input type="button" value={"in store experienced"}  onClick={CollectedObject} className='btn bg-black me-2 text-white'  name='chooceProblem' />
</div>

<div className='my-2 mx-2'>
<input type="button" value={"Delivery Pickup Option"}  onClick={CollectedObject} className=' btn bg-black text-white me-2 text-white' name='chooceProblem' />
<input type="button" value={"Other"}  onClick={CollectedObject} className=' btn bg-black text-white' name='chooceProblem' />
</div>
</div>


</div>  : rateitem.chooceProblem=' '}

<div className='TextArea text-center w-50'>
<textarea 
 placeholder='Please till Us More (Max length 300 character)'
 className='w-100' onChange={CollectedObject}  name="commentTextArea" id="myid" cols="3" rows="5">
  </textarea>

</div>

  <div className="sub w-50 text-center">
  <button type='submit'className={active? ' btn btn-danger p-1 w-50 text-center mt-2':' btn btn-success p-1 w-50 text-center mt-2'}>Submit</button>
  </div>
  </form>


 </div>

  )
}
