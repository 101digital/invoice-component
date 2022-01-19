import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const AddInvoiceIcon: React.FC<Props> = ({ size = 72, color }) => {
  return (
    <SvgCss
      xml={`<svg width="72" height="72" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d)">
  <rect x="11" y="8" width="60" height="60" rx="30" fill="${color}"/>
  <path d="M41.0854 27.4016V48.7691" stroke="#F4E600" stroke-width="3.84615" stroke-linecap="round"/>
  <path d="M51.7693 38.0854L30.4018 38.0854" stroke="#F4E600" stroke-width="3.84615" stroke-linecap="round"/>
  </g>
  <defs>
  <filter id="filter0_d" x="0.230769" y="0.307692" width="81.5385" height="81.5385" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
  <feOffset dy="3.07692"/>
  <feGaussianBlur stdDeviation="5.38462"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
  </filter>
  </defs>
  </svg>
  `}
      width={size}
      height={size}
      fill={color}
    />
  );
};

export { AddInvoiceIcon };
