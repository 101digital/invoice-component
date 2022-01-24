import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const SearchIcon: React.FC<Props> = ({ size, color = '#9B9BC5' }) => {
  return (
    <SvgCss
      xml={`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="8.24333" cy="8.24333" rx="5.24333" ry="5.24333" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 12L15 15" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `}
      width={size}
      height={size}
    />
  );
};
export { SearchIcon };
