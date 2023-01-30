import React from 'react';
import { FaHome, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome syze={24} />
      </Link>
      <Link to="/cadastrar">
        <FaUserAlt syze={24} />
      </Link>
    </Nav>
  );
}
