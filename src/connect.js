import * as React from 'react';

class RemoduxHOC extends React.Component {
  constructor(props) {
    super(props);
    const {
      componentType,
      mapStateToProps,
      mapDispatchToProps,
      store,
      ...attrs
    } = props;
    this.state = {
      ...attrs,
      ...this.storeState
    };
  }

  componentDidMount() {
    const { store } = this.props;
    this.setState(this.storeState);
    this.unsubscribe = store.subscribe(() => {
      this.setState(this.storeState);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  get storeState() {
    const { mapStateToProps, store } = this.props;
    return mapStateToProps
      ? mapStateToProps(store.getState())
      : store.getState();
  }

  get storeDispath() {
    const { mapDispatchToProps } = this.props;
    const dispatch = action => this.dispatch(action);
    return mapDispatchToProps
      ? { ...mapDispatchToProps(dispatch), dispatch }
      : { dispatch };
  }

  dispatch(action) {
    const { store } = this.props;
    return store.dispatch(action);
  }

  render() {
    const props =
      typeof this.componentType === 'string'
        ? this.state
        : {
            ...this.state,
            ...this.storeDispath
          };
    return React.createElement(this.componentType, props);
  }
}

const connect = (
  store,
  mapStateToProps = null,
  mapDispatchToProps = null
) => componentType => props =>
  React.createElement(RemoduxHOC, {
    ...props,
    componentType,
    mapStateToProps,
    mapDispatchToProps,
    store
  });

export default connect;
