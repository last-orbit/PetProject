import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';


const FavoritePet = ({
  favoritePets,
  setFavoritePets,

}) => {
  const { id } = useParams();

  async function handleDeletePet(petId) {
    try {
      const { data } = await axios.delete(`${API_URL}/pets/${petId}`);
      //console.log('deleted: ', data);
      // Update the favoritePets state after deletion
      setFavoritePets(favoritePets.filter((pet) => pet.id !== petId));
      alert('Pet Deleted 😿');
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(favoritePets);

  return (
    <div className='fav-page'>
      <h1>Favorite Pets</h1>
      <div className='main-container fav'>
        {favoritePets.length === 0 ? (
          <h2 className='saved-flats-text'>
            Your Favorite Pets would go here, if you saved any.
          </h2>
        ) : (
          favoritePets.map((pet) => (
            <div key={pet.id} className='pet-card'>
              <div className='picture-container'>
                <img className='fav-pic' src={pet.url} alt={pet.name} />
              </div>
              <div className='favinfo-container'>
                <h3>{pet.name}</h3>
                <p>{pet.description}</p>
                <button
                  className='btn-container'
                  onClick={() => handleDeletePet(pet.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritePet;
