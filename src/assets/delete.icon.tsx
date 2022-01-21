import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const DeleteIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size ? size : 11.207} height={size ? size : 14.408} viewBox="0 0 11.207 14.408">
      <Defs />
      <G id="prefix__delete_1_" transform="translate(-41.667)">
        <G id="prefix__Group_7887" transform="translate(42.667)">
          <G id="prefix__Group_7886">
            <Path
              id="prefix__Path_7834"
              d="M64 94.939a1.6 1.6 0 001.6 1.6H72a1.6 1.6 0 001.6-1.6v-9.606H64z"
              fill={color ? color : '#646876'}
              transform="translate(-64 -82.131)"
            />
            <Path
              id="prefix__Path_7835"
              d="M51.072.8l-.8-.8h-4l-.8.8h-2.8v1.6h11.201V.8z"
              fill={color ? color : '#646876'}
              transform="translate(-43.667)"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export { DeleteIcon };
