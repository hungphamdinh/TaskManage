import React from 'react';

export const withVisible = (Component: any) => {
  return class ComponentWithVisible extends React.Component {
    state = {
      visible: false,
    };

    changeVisible = () => {
      this.setState({visible: !this.state.visible});
    };

    render() {
      const {visible} = this.state;

      return (
        <Component
          {...this.props}
          visible={visible}
          onChangeVisible={this.changeVisible}
        />
      );
    }
  };
};
