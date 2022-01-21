import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
}

const DangerIcon: React.FC<Props> = ({ size }) => {
  return (
    <SvgCss
      xml={`<svg width="75" height="74" viewBox="0 0 75 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="icon/Danger Triangle">
      <g id="Danger Triangle">
      <path id="Stroke 1" fill-rule="evenodd" clip-rule="evenodd" d="M15.3433 63.0134H59.6909C64.5687 63.0134 67.6304 57.7409 65.2069 53.5044L43.0501 14.7623C40.6112 10.498 34.463 10.495 32.021 14.7592L9.8272 53.5013C7.4037 57.7378 10.4624 63.0134 15.3433 63.0134Z" stroke="#DB0011" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="Stroke 3" d="M37.508 41.3619V31.8036" stroke="#DB0011" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="Stroke 2" d="M37.4847 50.8751H37.5156" stroke="#DB0011" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </g>
      </svg>`}
      width={size}
      height={size}
    />
  );
};

export { DangerIcon };
