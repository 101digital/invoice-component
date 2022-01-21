import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const MoreIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg fill={color} width={size ? size : 4} height={size ? size : 17} viewBox="0 0 4 17">
      <Path d="M2 4.25a1.942 1.942 0 01-1.414-.622 2.22 2.22 0 010-3.005A1.942 1.942 0 012 0a1.942 1.942 0 011.414.622 2.22 2.22 0 010 3.005A1.942 1.942 0 012 4.25zm0 6.375A1.942 1.942 0 01.586 10a2.22 2.22 0 010-3A1.942 1.942 0 012 6.375 1.942 1.942 0 013.414 7a2.22 2.22 0 010 3.005 1.942 1.942 0 01-1.414.62zM2 17a1.942 1.942 0 01-1.414-.622 2.22 2.22 0 010-3.005A1.942 1.942 0 012 12.75a1.942 1.942 0 011.414.622 2.22 2.22 0 010 3.005A1.942 1.942 0 012 17z" />
    </Svg>
  );
};

export { MoreIcon };
