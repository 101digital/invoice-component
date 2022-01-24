import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
interface Props {
  size?: number;
  color?: string;
}

const AttachmentIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size ? size : 11} height={size ? size : 13} viewBox="0 0 11 13" fill="none">
      <Path
        d="M10.446 4.299l-3.75 6.495a3 3 0 01-4.098 1.098v0A3 3 0 011.5 7.794L5 1.732A2 2 0 017.732 1v0a2 2 0 01.732 2.732l-3.5 6.062a1 1 0 01-1.366.366v0a1 1 0 01-.366-1.366l3-5.196"
        stroke={color ? color : '#BEB4AA'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { AttachmentIcon };
