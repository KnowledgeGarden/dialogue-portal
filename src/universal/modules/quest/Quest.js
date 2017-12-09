import React, {PropTypes, Component} from 'react';
import SocialPublic from 'material-ui/svg-icons/social/public';
import styles from './Guild.css';

export default class Quest extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={styles.blog}>
        {this.props.children.size ? this.props.children : this.renderEmpty()}
      </div>
    );
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <SocialPublic className={styles.icon}/>
        <h3>There aren't any Quests</h3>
      </div>
    );
  }
}
