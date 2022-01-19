export interface ScrollContextInterface {
  opacity: number;
  maxOffset: number;
  offset: number;
  titleShowing: boolean;
  updateOffset(val: number): void;
}

export interface ChildProps {
  children: JSX.Element[] | JSX.Element;
}
