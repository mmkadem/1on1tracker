import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
} from 'material-ui/List';
import FollowUpItem from '../followUps/FollowUpItem';
import followUpActions from '../../actions/followUps';

class DirectFollowUpList extends Component {
  componentDidMount() {
    this.selectFollowUps();
  }

  selectFollowUps() {
    this.props.followUpsEqualTo("directKey", this.props.directId);
  }

  renderItems() {
    const rows = [];
    if (this.props.followUps && this.props.followUps.size > 0) {
      this.props.followUps.forEach((item, key) => {
        rows.push(
          <FollowUpItem
            key={key}
            followUp={item}
            id={key}
            primaryText={new Date(item.followUpDate).toLocaleDateString()}
            secondaryText={`${item.description || 'TBD'}`}
          />);
      });
    } else {
      rows.push(
        <ListItem
          primaryText="No items"
        />);
    }
    return rows;
  }

  render() {
    return (
      <div className="wrapper">
        <List>
          {this.renderItems()}
        </List>
      </div>
    );
  }
}

DirectFollowUpList.propTypes = {
  directId: React.PropTypes.string.isRequired,
  followUps: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    followUps: state.followUps.matchingList,
  };
};

export default connect(
  mapStateToProps,
  {
    followUpsEqualTo: followUpActions.equalTo,
  },
)(DirectFollowUpList);
