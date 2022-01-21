import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const InvoiceViewIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size ? size : 16} height={size ? size : 14} viewBox="0 0 16 14" fill="none">
      <Path
        clipRule="evenodd"
        d="M10.371 7.04a2.371 2.371 0 11-4.742-.001 2.371 2.371 0 014.742 0z"
        stroke={color ? color : '#BBBBD8'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M7.998 12.516c2.856 0 5.469-2.053 6.94-5.477-1.471-3.423-4.084-5.476-6.94-5.476h.003c-2.855 0-5.468 2.053-6.938 5.476 1.47 3.424 4.083 5.477 6.939 5.477h-.004z"
        stroke={color ? color : '#BBBBD8'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { InvoiceViewIcon };
