import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
{
  /**
    APIs
    cats profile data: 'https://www.freetestapi.com/apis/cats' No access-control-allow-origin header is present on the requested resource
    cats imgs: base endpoint: https://www.cataas.com can't get random image
    cats imgs: https://api.thecatapi.com/v1/images/search?limit=10 for more imgs a key is needed
    dog imgs : https://dog.ceo/api/breeds/image/random gives random image and it works

    http://localhost:5005/cats for cat data
    http://localhost:5005/catpics for cat pictures
    */
}
const HomePage = () => {
  const [cats, setCats] = useState([]);
  const [randomCat, setRandomCat] = useState({});

  const [catTweets, setCatTweets] = useState({});
  const [catTweet, setCatTweet] = useState({});

  const navigate = useNavigate();

  function getRandomItem(arr) {
    return arr.at(Math.floor(Math.random() * arr.length));
  }

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_URL}/pets`);
        const response2 = await fetch(`${API_URL}/tweets`);

        const data = await response.json();
        const tweets = await response2.json();

        setCats(data);
        setRandomCat(getRandomItem(data));

        setCatTweets(tweets);
        setCatTweet(getRandomItem(tweets));

      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const getRandomProfile = () => {
    //console.log(randomCat.id);

    setRandomCat(getRandomItem(cats));
    setCatTweet(getRandomItem(catTweets));
  };

  return (
    <div>
      <div className='main-container'>
        <div className='ui-container'>
          <div className='profile-container'>

            <div>
              <img className='foto' src={randomCat.url} alt='cat photo' />
              <div className='profile-nav'>

                <div className='navigation-button' onClick={() => navigate(`/profile/${randomCat.id}`)}>Check Pawfile</div>
                <div className='navigation-button' onClick={getRandomProfile}>Next</div>

              </div>
            </div>

            <div className='info-container'>
              <h2>Who and Where</h2>
              <div className='basic-info'>
                <p><b>Who:</b> {randomCat.name}</p>
                <p><b>Where:</b> {randomCat.origin}</p>
              </div>
              <h2>Deep Thoughts</h2>
              <div className='tweets'>
                <p>{catTweet.quote}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
