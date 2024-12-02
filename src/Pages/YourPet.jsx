import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const YourPet = ({ yourPets, setYourPets }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYourPets = async () => {
      try {
        const response = await axios.get(`${API_URL}/yourPets/${id}`);
        setYourPets(response.data);
      } catch (error) {
        console.error('Error fetching pet:', error);
      }
    };

    fetchYourPets();
  }, [id]);

  async function handleDeletePet(petId) {
    console.log('deleted: ', petId);
    try {
      const { data } = await axios.delete(`${API_URL}/yourPets/${petId}`);

      // Update the youPets state after deletion
      setYourPets(yourPets.filter((pet) => pet.id !== petId));
      alert('Pet Deleted 😿');
    } catch (error) {
      console.log(error);
    }
  }

  if (!yourPets) return <p>Loading...</p>;
  return (
    <div className='yourPets-page'>
      <h1>Your Pets</h1>
      <div className='main-container fav'>
        {yourPets.length === 0 ? (
          <h2 className='saved-flats-text'>
            Your Pets would go here, if you saved any
          </h2>
        ) : (
          yourPets.map((yourPet) => (
            <div key={yourPet.id}>
              <section className='pet-card'>
                <div className='picture-container'>
                  <img className="pet-pic" src={yourPet.url} alt='your-pet' />
                </div>
                <div className='petinfo-container'>
                  <h3>My name is: {yourPet.name}</h3>
                  <p>I am {yourPet.age} years old <br></br>
                    I am a {yourPet.species} <br></br>
                    Color:{yourPet.color} <br></br>
                    Breed: {yourPet.breed} <br></br>
                    I have these qualities: I'm {yourPet.temperament} <br></br>
                    Something about myself :{yourPet.description}</p>
                </div>
                <div className='row-button'>
                  <button
                    className='addPet-button small-btn'
                    onClick={() => navigate(`/updateYourPet/${yourPet.id}`)}
                  >
                    Update Your Pet
                  </button>
                  <button
                    className='addPet-button delete-button small-btn'
                    onClick={() => handleDeletePet(yourPet.id)}
                  >
                    Delete Your Pet
                  </button>
                </div>
              </section>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default YourPet;
