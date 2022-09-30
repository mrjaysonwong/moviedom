import Link from 'next/link';
import { homeDataPage } from '@utils/apis/api';
import { useState, useEffect } from 'react';

// domain.com/popular
const Popular = () => {

  return (
    <>
      <h1>Popular Movies</h1>
      <ul>
        <li>12 Angry Men</li>
      </ul>
    </>
  );
};

export default Popular;
