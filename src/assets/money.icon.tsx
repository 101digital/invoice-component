import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface Props {
  size?: number;
  color?: string;
}

const MoneyIcon: React.FC<Props> = ({ size, color = '#5d21d2' }) => {
  return (
    <Svg width={size ? size : 23.099} height={size ? size : 16.148} viewBox='0 0 23.099 16.148'>
      <Defs />
      <G id='prefix__money' transform='translate(0 -75.6)'>
        <G id='prefix__Group_7851' transform='translate(0 75.6)'>
          <G id='prefix__Group_7850'>
            <Path
              id='prefix__Path_7806'
              d='M23.035 84.391c-.12-.566-.731-1.021-1.839-1.356a12.959 12.959 0 00-3.384-.474l-.124-5.232c-.17-.515-.782-.933-1.816-1.246a13.654 13.654 0 00-3.8-.483 13.288 13.288 0 00-3.766.483c-.832.257-1.83.736-1.83 1.559a.847.847 0 00.014.152l.051 2.1a5.5 5.5 0 102.429 9.674 13.728 13.728 0 002.956.322c.234 1.274 3 1.858 5.573 1.858a13.357 13.357 0 003.77-.487c.841-.257 1.83-.74 1.83-1.563zM8.561 76.966a12.454 12.454 0 013.5-.446 12.885 12.885 0 013.54.446c1 .3 1.218.616 1.218.68s-.216.377-1.218.68a13 13 0 01-3.536.446 12.624 12.624 0 01-3.389-.414c-.989-.285-1.269-.6-1.292-.7 0 0 0-.009-.009-.014 0-.099.308-.407 1.186-.678zm8.331 1.816v1.149a.466.466 0 00-.074.257c0 .06-.216.377-1.214.68a12.826 12.826 0 01-3.536.446 13.154 13.154 0 01-3.131-.345c-.014 0-.028 0-.037-.009a5.279 5.279 0 00-1.435-.814l-.032-1.3a5.094 5.094 0 00.993.382 13.589 13.589 0 003.646.446 13.6 13.6 0 003.8-.483 4.529 4.529 0 001.02-.409zm-8.308 9.9A4.583 4.583 0 115.5 80.713a4.683 4.683 0 011.356.2 4.476 4.476 0 011.628.906 4.577 4.577 0 011.508 2.552 4.808 4.808 0 01.092.924 4.548 4.548 0 01-1.5 3.39zm1.168.1a5.552 5.552 0 00.883-1.513c.4.032.809.055 1.237.06a.473.473 0 000 .161l.018 1.48a13.989 13.989 0 01-2.138-.183zm1.228-4.032c.271.018.552.028.841.032a.736.736 0 00.023.1l.018 1.531c-.331 0-.657-.018-.966-.041a5.652 5.652 0 00.104-1.08c0-.179-.007-.358-.02-.542zm1.122-.883h-.037c-.446 0-.869-.018-1.264-.051a5.537 5.537 0 00-.818-1.71 16.614 16.614 0 002.083.133 13.6 13.6 0 003.8-.483 4.867 4.867 0 001.025-.423v1.228a13.024 13.024 0 00-3.09.423 3.584 3.584 0 00-1.701.883zm.634.685c.078-.143.423-.423 1.32-.671a12.735 12.735 0 013.306-.391h.038a12.827 12.827 0 013.536.437c.966.294 1.2.589 1.214.667 0 .069-.23.386-1.251.69a12.807 12.807 0 01-3.5.432 13.138 13.138 0 01-3.292-.382 2.564 2.564 0 01-1.347-.662.394.394 0 00-.024-.12zm9.444 5.14c0 .064-.2.382-1.182.685a12.355 12.355 0 01-3.5.451A12.535 12.535 0 0114 90.391c-.878-.271-1.172-.575-1.172-.676v-.289l-.014-1.039a5.681 5.681 0 001.145.414 14.073 14.073 0 003.439.391 13.494 13.494 0 003.784-.483 4.115 4.115 0 001-.418v1.4zm-.06-2.547c0 .064-.211.377-1.2.68a12.7 12.7 0 01-3.527.441c-2.5 0-4.2-.556-4.6-1l-.018-1.453a11.07 11.07 0 004.621.823 13.727 13.727 0 003.752-.469 5.028 5.028 0 001.035-.418V86.9c-.003.07-.063.153-.063.245z'
              fill={color}
              transform='translate(0 -75.6)'
            />
          </G>
        </G>
        <G id='prefix__Group_7853' transform='translate(2.469 82.258)'>
          <G id='prefix__Group_7852'>
            <Path
              id='prefix__Path_7807'
              d='M56.735 220.4a3.035 3.035 0 103.035 3.035 3.035 3.035 0 00-3.035-3.035zm0 5.154a2.115 2.115 0 112.115-2.115 2.115 2.115 0 01-2.115 2.115z'
              fill={color}
              transform='translate(-53.7 -220.4)'
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export { MoneyIcon };
