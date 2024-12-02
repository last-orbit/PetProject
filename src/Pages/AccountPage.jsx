import React from 'react'
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <div className='account-page'>
      <h1>Account Page</h1>
          <p>Huh? What are you doing here?</p>
          <p>You don't have an actual account, we haven't learned how to do that yet. </p>
      <Link to='/'>Why don't you go back home</Link>
    </div>
  );
}

export default Account