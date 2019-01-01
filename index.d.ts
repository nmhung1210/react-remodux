declare module 'react-remodux' {
  export function connect(
    store: any,
    mapStateToProps?: (state: any) => any,
    mapDispatchToProps?: (dispatch: any) => any
  ): any;
}
