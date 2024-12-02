import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import rawr from '../assets/rawr.gif';
import axios from 'axios';
import { API_URL } from '../config';

const Detailspage = ({ addFavoritePet }) => {
  const [cat, setCat] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/pets/${id}`)
      .then((response) => setCat(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='main-container'>
      {cat && (
        <div className='pet-details'>
          <img src={cat.url} />
          <div className='details-info-container'>
            <div id='rawr-container'>
              <img src={rawr} className='rawr-gif' />
              <h1 className='h1-centered'>*RAWWRRRR*</h1>
              <img src={rawr} className='rawr-gif' />
            </div>
            <h1 className='h1-centered'>Get to know "{cat.name}"</h1>
            <h4>
              <b>Characteristics:</b>
            </h4>
            <div className='details-temperament'>{cat.temperament}</div>
            <h4>
              <b>Trivia:</b>
            </h4>
            <div className='details-description'>{cat.description}</div>
            <div className='row-button'>
              <button className='detail-button' onClick={() => navigate(`/updatePet/${id}`)}>Update Profile
              </button>
              <button className="detail-button" onClick={() => addFavoritePet(cat.id)}>Favorite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detailspage;