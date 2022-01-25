import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const EditItemIcon: React.FC<Props> = ({ size, color = '#5d21d2' }) => {
  return (
    <Svg width={size ? size : 17.387} height={size ? size : 17.387} viewBox="0 0 17.387 17.387">
      <Path
        data-name="Path 9888"
        d="M9.737 10.291h-2.64V7.656L14.753 0l2.635 2.635zm-1.4-1.243h.882l6.407-6.413-.876-.876-6.413 6.406z"
        fill={color}
      />
      <Path
        data-name="Path 9889"
        d="M16.231 17.387H0V1.156h8.426v1.243H1.243v13.746h13.746V8.961h1.243z"
        fill={color}
      />
      <Path data-name="Path 9890" d="M3.095 13.311h6.214v1.243H3.095z" fill={color} />
    </Svg>
  );
};

export { EditItemIcon };
