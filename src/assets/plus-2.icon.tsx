import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const Plus2Icon: React.FC<Props> = ({ size = 24, color = '#464BE6' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3v18M21 12H3" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
};
export { Plus2Icon };
