//-------------- Define Action types
const SHOW_INDICATOR = 'SHOW_INDICATOR';
const HIDE_INDICATOR = 'HIDE_INDICATOR';

//-------------- Actions
const showIndicator = (backdropColor: string) => ({
  type: SHOW_INDICATOR,
  backdropColor,
});

const hideIndicator = () => ({
  type: HIDE_INDICATOR,
});

//-------------- Reducer
const initialState = {
  isShowIndicator: false,
  backdropColor: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_INDICATOR:
      return {
        ...state,
        isShowIndicator: true,
        backdropColor: action.backdropColor,
      };

    case HIDE_INDICATOR:
      return {
        ...state,
        isShowIndicator: false,
      };

    default:
      return state;
  }
};

export { showIndicator, hideIndicator };
