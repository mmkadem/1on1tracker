import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardTitle,
  CardText } from 'material-ui/Card';
import {
  List,
  ListItem,
} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router';

import followUpActions from '../../actions/followUps';
import * as headerActions from '../../actions/header';

class FollowUpShow extends Component {
  componentDidMount() {
    this.props.find(this.props.params.id);
    this.props.setText('Follow Up');
  }

  render() {
    const { followUp, loading, error } = this.props;

    if (loading) {
      return <div className="container">Loading...</div>;
    } else if (error) {
      return <div className="container">{error.message}</div>;
    } else if (!followUp) {
      return <span>No FollowUp</span>;
    }

    const direct = this.props.directs.get(followUp.directKey);
    return (
      <div className="container">
        <Card>
          <CardActions>
            <List>
              <ListItem
                leftCheckbox={
                  <Checkbox
                    checked={followUp.completed}
                  />
                }
                primaryText="Completed"
              />
            </List>
          </CardActions>
          <CardTitle
            title={direct.name}
            subtitle={new Date(followUp.followUpDate).toLocaleDateString()}
          />
          <CardText>
            <h2>What needs to be done?</h2>
            {followUp.description ? (
              <pre>{followUp.description}</pre>
            ) : 'TBD' }
          </CardText>
          <CardActions>
            <FlatButton
              label="Edit"
              containerElement={<Link to={`/followUps/${this.props.params.id}/edit`} />}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

FollowUpShow.propTypes = {
  setText: React.PropTypes.func.isRequired,
  find: React.PropTypes.func.isRequired,
  directs: React.PropTypes.object.isRequired,
  followUp: React.PropTypes.object,
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    followUp: state.followUps.activeFollowUp,
    directs: state.directs.list,
    loading: state.followUps.loading,
    error: state.followUps.error,
  };
};

export default connect(mapStateToProps,
  { find: followUpActions.find,
    setText: headerActions.setText,
  })(FollowUpShow);
