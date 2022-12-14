import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";


export default function Pokemon() {
  const [link, setLink] = useState(null);
  const [pokesUrls, setPokesUrls] = useState([]);
  const [selectPoke, setSelectPoke]=useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [openedCards, setOpenedCards] = useState([])
  const [opened, setOpened] = useState(false)
  const [notMatched, setNotMatched]= useState(false)
  const [Matched, setMatched]= useState(false)
  const [pokeLevel, setPokeLevel]= useState("pokeball.png");


  const handleClick = (url, index) => {
   if(selectPoke === null){
    setOpenedCards(openedCards.concat(index))
    setSelectedIndex(index)
    return setSelectPoke(url)
   }
   const currentOpenedCards = [...openedCards];
   if(selectedIndex === index){
    setSelectedIndex(index)
    setSelectPoke(url)
    return alert("You can't click the same pokemon twice")
   } 
   const isMatched= () => {  
      setOpenedCards(openedCards.concat(index))
      //Can you explain me why here setopenedcards? need to change it maybe?
      setSelectPoke(url)
      setSelectPoke(null);
      setMatched(true);

    return setMatched(false)
  }
  
  const openedFunction= () => {
    if (openedCards.length === 39 ){
       return setOpened(true)
    }
   }
  const isNotMatched= () => {
      setOpenedCards(openedCards.concat(index))
      setSelectPoke(null)
      setSelectedIndex(null)
      currentOpenedCards.splice(openedCards.length -1, 1)
    
    
    setTimeout(() => {
      setOpenedCards(currentOpenedCards)  //Here all my opened card tuned off ;(( maybe select last 2 pokes selecteds
      setNotMatched(true)
      return setNotMatched(false)
    },200 )
    
  }


  // const levelFunction =()=>{
    
  // }
    openedFunction();
   return selectPoke === url ? isMatched() : isNotMatched()
  
   }

   const changeLevelFunction =()=>{
    setPokeLevel("MasterBall.png");
    restartFunction()
    return setPokesUrls(pokesUrls.sort(() => 0.5 - Math.random()));
  }
   const restartFunction =()=>{
    setOpenedCards([])
    setOpened(false)
    return setPokesUrls(pokesUrls.sort(() => 0.5 - Math.random()));
  }
 
  const fetchPokes = async () => {
    try {
      if (link) {
        return setLink(null);
      }
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");

      const finalResponse = await response.json();

      finalResponse.results.forEach(async (poke) => {
        const response = await fetch(poke.url);
        const responsePoke = await response.json();
        const urlPokeFoto = responsePoke.sprites.front_default;
        setPokesUrls((prevState) => [...prevState, urlPokeFoto, urlPokeFoto].sort(() => 0.5 - Math.random())
        );
      });

      // const finalResponse = await response.json();
      // console.log(finalResponse);
      // const myImage = finalResponse.sprites.other.dream_world.front_default;
      // setLink(myImage);
      // const idPoke = finalResponse.id;
      // setIdPoke(idPoke);
      // const arrayPokes = finalResponse.filter((poke)=>{

      // })
    } catch (error) {
      console.log("this is my error", error);
    }
  };

  console.log("this are my pokes", pokesUrls);

  // console.log("this is my link and setLInk", link, setLink);

  useEffect(() => {
    fetchPokes();
  }, []);


  return (
    <div className="bg-gray-500">
        
      <div>
        <div className="mx-4 text-center ">
        <Link href="/">
          <button className="font-black text-3xl border border-black text-black bg-white py-4 px-2 rounded-xl my-10 pointer-events-none">
            Game of Pok??memory
          </button>
           </Link>
          <h1 className="font-bold mb-4">
            Click some pokeball to view the pok??mon who&apos;s behind it!
          </h1>
        </div>
      </div>
     
    <div className="text-center pb-10 md:mx-10 ">
    {/* {(Matched) ? (<div className="rounded-3xl mt-10 ml-40 md:ml-80 md:w-20 text-center text-white font-bold bg-green-500">OLEE</div>) : (null) }
           {(notMatched) ? (<div className="rounded-3xl mt-10 ml-40 md:ml-80 md:w-20 text-center text-white font-bold bg-red-500">CACAaaa</div>) : (null) } */}
      <div id="color" class="grid grid-cols-5 md:gap-y-4 relative border-4 rounded-xl border-black bg-white px-2 md:py-4 py-2 ">
        { (opened===true) ? (<div className="bg-green-500 py-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   rounded-xl">
            <p className="text-black py-1">Nice! You just completed the game.</p>
            <p className="text-black font-bold pb-2">What do you want to do?</p>
            <button className="bg-white text-black rounded px-2 my-2" onClick={() => changeLevelFunction()}>Change Pokeball</button>
            <br></br>
            <button className="bg-blue-500 my-3 font-bold rounded px-2" onClick={()=> restartFunction() }>Restart</button> 
            <br></br>
            <Link href="/"><button className="bg-black my-3 text-white rounded px-2">Home</button></Link>
            </div> ) : (null)
           }{pokesUrls
          .map((pokeUrl, index) => (
            <div key={index} className="flex justify-center">
            <img className="w-20 h-20" onClick={() => handleClick(pokeUrl, index)} key={index} alt="pokemone"
            //  src={selectPoke === pokeUrl && selectedIndex === index ? pokeUrl : "pokeball.png"} ></img>
            src={openedCards.includes(index) ? pokeUrl : pokeLevel }></img> </div>
          ))}
      </div>
      </div>
      {/* <div onClick={() => fetchPokes()}>
        {link ? (
          <img alt="pokemon" src={link}></img>
        ) : (
          <img alt="putaaa" src="/logo192.png"></img>
        )}
      </div> */}
    </div>
  );
}
