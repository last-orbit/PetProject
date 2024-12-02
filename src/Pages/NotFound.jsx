import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found-page'>
      <h1>404 Not Found Page </h1>
      <p>Oopsies!</p>
      <p>This page was not found, It's like herding kittens back here!</p>
      <Link to='/'>Why don't you go back home</Link>
    </div>
  );
};

export default NotFound;
