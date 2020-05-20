import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import PickCharacters from "./components/PickCharacters";
import Crawl from "./components/Crawl";
import axios from "axios";

function App() {

  const [ allCharData, setAllCharData ] = useState({});
  const [ charList, setCharList ] = useState([]);
  const [ charA, setCharA ] = useState("");
  const [ charB, setCharB ] = useState("");
  const [ formError, setFormError ] = useState("");

  const [ samePlanet, setSamePlanet ] = useState("");
  const [ sameShip, setSameShip ] = useState([]);
  const [ sameVehicle, setSameVehicle ] = useState([]);
  const [ sameFilm, setSameFilm ] = useState([]);

  useEffect(() => {
    const getAllCharacters = () => {
      axios.get("https://swapi.dev/api/people/")
          .then(response => {
            if(response.data.count > 10) {
              const arrayOfPromises = [];
              let i = 1;
              const total = Math.floor(82 / 10) + 1;
              for (; i <= total; i++) {
                const url = "https://swapi.dev/api/people/?page=" + i;
                arrayOfPromises.push(axios.get(url));
              }
              axios.all(arrayOfPromises).then(axios.spread((...response) => {
                let newCharData = {};
                let newCharList = [];
                response.forEach(res => {
                 res.data.results.forEach( item => {
                    newCharList.push(item.name);
                    newCharData = {...newCharData, [item.name]: item }
                  });
                });
                setCharList(newCharList);
                setAllCharData(newCharData);
              })).catch( error => {
                console.error(error);
              })
            }
          }).catch(error => {
        console.error(error);
      });
    };
    getAllCharacters();
  }, []);

  const handleCharacterSelection = (event, id) => {
    id === "A" ? setCharA(event.target.value) : setCharB(event.target.value);
  };

  const handleCharacterCompare = () => {
    if(charA === "" || charB === ""){
      setFormError("Please pick a character from both dropdowns");
      return;
    } else if(charA === charB){
      setFormError("Please pick 2 different characters");
      return;
    } else
      setFormError("");

    setSamePlanet("");
    setSameShip("");
    setSameVehicle("");
    setSameFilm("");
    let found = false;

    if(allCharData[charA].homeworld === allCharData[charB].homeworld){
      getPlanetName(allCharData[charA].homeworld);
      found = true;
    }

    const sameShips = allCharData[charA].starships.filter( item => allCharData[charB].starships.includes(item));
    if(sameShips.length > 0){
      getShipName(sameShips);
      found = true;
    }

    const vehicles = allCharData[charA].vehicles.filter( item => allCharData[charB].vehicles.includes(item));
    if(vehicles.length > 0){
      getVehicleName(vehicles);
      found = true;
    }

    if(!found)
      setFormError(`No relationship between ${charA} and ${charB} were found`);
    else
      findSameFilm();
  };

  const findSameFilm = () => {
    const arrayOfPromises = [];
    allCharData[charA].films.forEach( item => {
      if (allCharData[charB].films.includes(item))
        arrayOfPromises.push(axios.get(item))
    });

    axios.all(arrayOfPromises).then(axios.spread((...response) => {
      const filmTitle = [];
      response.forEach( (item, index) => {
        if(response.length > 1 && (index+1) === response.length)
          filmTitle.push(`and ${item.data.title}`)
        else
          filmTitle.push(item.data.title);
      });
      if(filmTitle.length > 1)
        setSameFilm(filmTitle.join(", "));
      else
        setSameFilm(filmTitle);
    }));
  };

  const getPlanetName = (url) => {
    axios.get(url).then( response => {
      setSamePlanet(response.data.name);
    }).catch( error => {
      console.error(error)
    });
  };

  const getShipName = (urls) => {
    if(urls.length <= 0 )
      return;

    const arrayOfPromises = [];
    urls.forEach( url => {
        arrayOfPromises.push(axios.get(url))
    });

    axios.all(arrayOfPromises).then(axios.spread((...response) => {
      const shipName = [];
      response.forEach( (item, index) => {
        if(response.length > 1 && (index+1) === response.length)
          shipName.push(`and ${item.data.name}`)
        else
          shipName.push(item.data.name);
      });
     if(shipName.length > 1)
        setSameShip(shipName.join(", "));
      else
        setSameShip(shipName);
    })).catch(error => {
      console.error(error);
    });
  };

  const getVehicleName = (urls) => {
    if(urls.length <= 0 )
      return;

    const arrayOfPromises = [];
    urls.forEach( url => {
      arrayOfPromises.push(axios.get(url))
    });

    axios.all(arrayOfPromises).then(axios.spread((...response) => {
      const vehicleName = [];
      response.forEach( (item, index) => {
        if(response.length > 1 && (index+1) === response.length)
          vehicleName.push(`and ${item.data.name}`)
        else
          vehicleName.push(item.data.name);
      });
      if(vehicleName.length > 1)
        setSameVehicle(vehicleName.join(", "));
      else
        setSameVehicle(vehicleName);
    })).catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="App">
      <div className={"prompt-box"}>
        <Header
          title={"Star Wars Known Relationships"}
          description={"check if any 2 Star Wars characters have lived or been seen together"}
          />
        <PickCharacters
          charA={charA}
          charB={charB}
          charList={charList}
          formError={formError}
          handleCharacterCompare={handleCharacterCompare}
          handleCharacterSelection={handleCharacterSelection}
        />
      </div>
      {sameFilm.length > 0 &&
        <Crawl
          title={sameFilm}
          planet={samePlanet}
          ship={sameShip}
          vehicle={sameVehicle}
          charA={charA}
          charB={charB}/> }
    </div>
  );
}

export default App;
