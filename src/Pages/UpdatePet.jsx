import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';

const UpdatePet = () => {
  const [petToUpdate, setPetToUpdate] = useState(null);
  const { petId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios(`${API_URL}/pets/${petId}`)
      .then((res) => {
        setPetToUpdate(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [petId]);

  function handleChange(e) {
    const whatWasTyped = e.target.value;
    const inputThatIsUsed = e.target.name;
    console.log('typed: ', whatWasTyped, 'used input: ', inputThatIsUsed);
    setPetToUpdate({ ...petToUpdate, [inputThatIsUsed]: whatWasTyped });
  }

  async function handleUpdatePet(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${API_URL}/pets/${petId}`, petToUpdate);
      console.log('updated: ', data);
      nav('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePet(petId) {
    try {
      const { data } = await axios.delete(`${API_URL}/${petId}`);
      nav('/');
      alert('Pet Deleted 😿');
    } catch (error) {
      console.log(error);
    }
  }
  //wait for data to be loaded
  if (!petToUpdate) { return <p>loading</p>; }

  return (
    <div className='main-container'>
      <div className='add-form'>
        <form onSubmit={handleUpdatePet}>
          <h2>Update your Pet</h2>
          {' '}
          <label>Image</label>
          <input type='text' name="url" value={petToUpdate.url} onChange={handleChange} />
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={petToUpdate.name}
            onChange={handleChange}
          />
          <label>Age</label>
          <input
            type='number'
            name='age'
            value={petToUpdate.age}
            min={1}
            max={25}
            onChange={handleChange}
          />
          <label>Breed</label>
          <input
            type='text'
            name='breed'
            value={petToUpdate.breed}
            onChange={handleChange}
          />
          <label>Color</label>{' '}
          <input
            type='text'
            name='color'
            value={petToUpdate.color}
            onChange={handleChange}
          />
          <label>Temperament</label>{' '}
          <input
            type='text'
            name='temperament'
            value={petToUpdate.temperament}
            onChange={handleChange}
          />
          <label>Description</label>{' '}
          <input
            type='text'
            name='description'
            value={petToUpdate.description}
            onChange={handleChange}
          />
          <div id='row-buttons'>

            <button className='addPet-button'>Update Pet</button>
            <button className='addPet-button delete-button' onClick={() => {
              handleDeletePet(petId);
            }}>Delete Pet</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePet;
