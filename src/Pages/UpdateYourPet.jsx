import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';

const UpdateYourPet = ({yourPets, setYourPets}) => {
  const [yourPetToUpdate, setYourPetToUpdate] = useState(null);
  const { petId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios(`${API_URL}/yourPets/${petId}`)
      .then(({ data }) => {
        setYourPetToUpdate(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [petId]);

  function handleChange(e) {
    const whatWasTyped = e.target.value;
    const inputThatIsUsed = e.target.name;
    setYourPetToUpdate({ ...yourPetToUpdate, [inputThatIsUsed]: whatWasTyped });
  }

  async function handleUpdatePet(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API_URL}/yourPets/${petId}`,
        yourPetToUpdate
      );
        console.log('this is our updated pets', data);
        // const updatedPets = yourPets.map((pet) =>
        //   pet.id === petId ? updatedPet : pet
        // );
        setYourPetToUpdate(data);
        const yourPetsMap = yourPets.map((pet) => {
            if (pet.id == petId) {
                return data;
            } else {
                return pet;
        }
        })
        setYourPets(yourPetsMap);
        console.log("pet updated" , data);
      nav('/yourPets');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePet(petId) {
    try {
      const { data } = await axios.delete(`${API_URL}/yourPets/${petId}`);
      console.log(data);
      nav('/yourPets');
    } catch (error) {
      console.log(error);
    }
    }
    if (!yourPetToUpdate) { return <p>loading</p>; }
  return (
    <>
      <div className='add-form main-container'>
        <h2>Update your Pet</h2>
        <form onSubmit={handleUpdatePet}>
          {' '}
          <label>Image</label>
          <input
            type='text'
            name='url'
            value={yourPetToUpdate.url}
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type='text'
            value={yourPetToUpdate.name}
            name='name'
            onChange={handleChange}
          />
          <label> Age</label>
          <input
            type='number'
            name='age'
            value={yourPetToUpdate.age}
            min={1}
            max={25}
            onChange={handleChange}
          />
          <label>Breed</label>
          <input
            type='text'
            name='breed'
            value={yourPetToUpdate.breed}
            onChange={handleChange}
          />
          <label>Color</label>{' '}
          <input
            type='text'
            name='color'
            value={yourPetToUpdate.color}
            onChange={handleChange}
          />
          <label>Temperament</label>{' '}
          <input
            type='text'
            name='temperament'
            value={yourPetToUpdate.temperament}
            onChange={handleChange}
          />
          <label>Description</label>{' '}
          <input
            type='text'
            name='description'
            value={yourPetToUpdate.description}
            onChange={handleChange}
          />
          <div id='row-buttons'>
            <button className='addPet-button'>Update Pet</button>
            <button
              className='addPet-button delete-button'
              onClick={() => {
                handleDeletePet(petId);
              }}
            >
              Delete Pet
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateYourPet;
