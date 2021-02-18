import { type } from 'os';
import React from 'react';

type Props = {
  text: string;
  color: string;
};

export const Header: React.FC<Props> = ({ text, color }) => {
  return <h1 style={{ color }}>{text}</h1>;
};

Header.defaultProps = {
  color: 'red',
  text: 'Hello world!',
};
