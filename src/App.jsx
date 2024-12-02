import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import AddPet from './Pages/AddPet';
import UpdatePet from './Pages/UpdatePet';
import Detailspage from './Pages/Detailspage';
import NotFound from './Pages/NotFound';
import FavoritePet from './Pages/FavoritePet';
import YourPet from './Pages/YourPet';
import AccountPage from './Pages/AccountPage';
import UpdateYourPet from './Pages/UpdateYourPet';
import { API_URL } from './config';

function App() {
  const [pets, setPets] = useState([]);
  const [favoritePets, setFavoritePets] = useState([]);
  const [yourPets, setYourPets] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/pets`);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchyourPets = async () => {
      try {
        const response = await fetch(`${API_URL}/yourPets`);
        const data = await response.json();
        setYourPets(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchyourPets();
  }, []);

  function addFavoritePet(id) {
    const pet = pets.find((pet) => pet.id == id);
    const filterPet = favoritePets.filter((pet) => pet.id === id);
    if (filterPet.length > 0) {
      return;
    }
    setFavoritePets([...favoritePets, pet]);
    alert('Pet added to favorite');

    // console.log([...favoritePets, pet]);
  }

  function addYourPet(id) {
    // console.log('added favorite pet with id', id);
    const pet = pets.find((pet) => pet.id == id);
    // console.log(pet, pets);
    const filterPet = yourPets.filter((pet) => pet.id === id);
    if (filterPet.length > 0) {
      return;
    }
    setYourPets([...yourPets, pet]);
    // console.log([...yourPets, pet]);
  }
  console.log('here', API_URL)
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/favorites'
          element={
            <FavoritePet
              favoritePets={favoritePets}
              setFavoritePets={setFavoritePets}
            />
          }
        />
        <Route
          path='/addPet'
          element={<AddPet yourPets={yourPets} setYourPets={setYourPets} />}
        />
        <Route path='/updatePet/:petId' element={<UpdatePet />} />
        <Route
          path='/profile/:id'
          element={
            <Detailspage
              yourPets={yourPets}
              pets={pets}
              setYourPets={setYourPets}
              addFavoritePet={addFavoritePet}
            />
          }
        />
        <Route
          path='/yourPets'
          element={
            <YourPet
              pets={pets}
              yourPets={yourPets}
              setYourPets={setYourPets}
              addYourPet={addYourPet}
            />
          }
        />
        <Route
          path='/updateYourPet/:petId'
          element={
            <UpdateYourPet yourPets={yourPets} setYourPets={setYourPets} />
          }
        />
        <Route path='*' element={<NotFound />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
