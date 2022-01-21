import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<Props> = ({ size, color = '#0d2050' }) => {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="14.454" height="14.454" viewBox="0 0 14.454 14.454">
  <defs>
      <style>
          .cls-1{fill:none;stroke:${color};stroke-linecap:square;stroke-width:2px}
      </style>
  </defs>
  <g id="Group_9571" transform="translate(-327.086 -64.086)">
      <path id="Line_52" d="M0 0L11.625 11.625" class="cls-1" transform="translate(328.5 65.5)"/>
      <path id="Line_53" d="M11.625 0L0 11.625" class="cls-1" transform="translate(328.5 65.5)"/>
  </g>
  </svg>
  `;
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { CloseIcon };
