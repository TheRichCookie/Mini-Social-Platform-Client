export interface UkWheelSelectorModel {
  textAlign?:
    | 'center'
    | 'end'
    | 'justify'
    | 'left'
    | 'nowrap'
    | 'right'
    | 'start'
    | 'wrap';
  weight?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onClick?: Function;
  currentIndex?: number;
  list?: string[];

  divider?: boolean;
  text?: string;
}

/*
export const initialPickerData: PickerDataModel =  {
  textAlign: 'center',
  weight: 1,
  className: '',

  onClick: (gIndex: number, iIndex: number): void => {},
  currentIndex: 0,
  list: [],

  divider: false,
  text: ''
}


public data = [
    {
        list: ['sun', 'earth', 'moon'],
    },
];
<uk-wheel-selector [data]="data" />
// */
