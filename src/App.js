import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../src/App.css'


const App = () => {
  const[countries, setCountries] = useState([])
  const[text, setText] = useState('')
  const[suggestions, setSuggestions] = useState([])
  const fetchAPI=()=>{
    axios.get('https://restcountries.com/v2/all')
    .then(function(response){
      console.log(response.data)
      setCountries(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
  }
  useEffect(()=>{
    fetchAPI()
  },[])

  const suggestList = (text)=>{
    setText(text);
    setSuggestions([]);
  }

  const searchSuggest =(text)=>{
    let matches=[]
    if(text.length>0){
      matches = countries.filter(countries=>{
        const regex = new RegExp(`${text}`,"gi");
        return countries.name.match(regex)
      })
    }
    // console.log(matches)
    setSuggestions(matches)
    setText(text)
  }
  return (
    <div className='App'>
      <input type="text" onChange={(e)=>searchSuggest(e.target.value)} value={text}/>
      {suggestions && suggestions.map((data, i)=>(<div key={i} onClick={()=>suggestList(data.name)}>{data.name}</div>)).slice(0,9)}
    </div>
  )
}

export default App