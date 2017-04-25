/**
 * <%= compName %> Component
 * @author <%= author %>
 */
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { allowMultiple } from '../../constants';
import styles from './<%= compName %>.css';

@CSSModules(styles, { allowMultiple })
class <%= compName %> extends PureComponent {

  static displayName = '<%= compName %>'

  static defaultProps = {
  }

  // https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div styleName={'<%= name %>'}><%= compName %></div>
    );
  }
}

export default <%= compName %>;
