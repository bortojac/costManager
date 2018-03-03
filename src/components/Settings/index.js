import { connect } from 'react-redux';
import Settings from './Settings';
import { deleteAll } from '@@store/actions';
import {  
  getDeleteMessage
 } from '@@store/selectors';
 import _ from 'lodash';


const mapStateToProps = state => ({
    deleteMessage: getDeleteMessage(state)
 })

const mapDispatchToProps = dispatch => {
  return {
      deleteAll: () => dispatch(deleteAll())
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(Settings);
