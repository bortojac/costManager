import React from 'react';
import './categorySettings.css';
import PropTypes from 'prop-types'
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/fontawesome-free-solid';
import { isNull } from 'util';

class CategorySettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategories: this.props.categories.slice(),
            duplicateMessage: undefined,
            disableSubmit: false
        };
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(){
        //reset newCategories state
        this.setState({newCategories: []});
    }

    componentDidMount() {
        this.props.fetchCategoryData()
    }

    handleCategorySubmit() {

        // disable if duplicates
        if (this.state.duplicateMessage || this.state.disableSubmit) {
            return
        }
        // assembling object to pass to updateCategories
        let objToSubmit = {};
        let i;
        for (i = 0; i < this.props.categories.length; i++) {
            objToSubmit[this.props.categories[i]] = this.state.newCategories[i];
        }

        console.log(objToSubmit);
        console.log(this.state.newCategories);
        // update categories in both mongoose collections
        this.props.updateCategories(objToSubmit);
        this.props.updateUserCategories(objToSubmit);
        this.props.fetchCategoryData();

        this.props.handleCategoryEdit();
    }

    handleChange(e) {
        // we need to update only the part of the state that is the current target
        let arr = this.state.newCategories.slice();
        arr[this.props.categories.indexOf(e.target.name)] = e.target.value;
        this.setState({ newCategories: arr });

        // ensure button is disabled if category is falsy
        if (!e.target.value) {
            this.setState({ disableSubmit: true })
        } else {
            this.setState({ disableSubmit: false })
        }

        // set duplicate message if there is a duplicate
        if (_.includes(this.props.categories, e.target.value) && e.target.name != e.target.value) {
            this.setState({ duplicateMessage: 'No duplicate categories are allowed!' });
        } else {
            this.setState({ duplicateMessage: undefined });
        }
    }

    handleDeleteClick(category) {
        this.props.deleteUserCategory(category);
    }

    renderDuplicateMessage() {
        return <p>{this.state.duplicateMessage}</p>;
    }

    renderCategories(categories) {
        if (!this.props.categoryEditFlag) {
            return (
                <ul className="categoryList">
                    {_.map(categories, (item, index) => {
                        return (
                            <li className="categoryListItem" key={`catListItem${index}`}>
                                <div className="categoryText">
                                    {item}
                                </div>
                                <a className="deleteLink" aria-label="Delete Category" onClick={() => this.handleDeleteClick(item)}><FontAwesomeIcon icon={faMinusCircle} /></a>
                            </li>
                        );
                    }
                    )
                    }
                </ul>
            )
        }
        else {
            return (
                <div className="categoryInputsContainer">
                    {_.map(categories, (item, index) => {
                        return <input key={`catInput${index}`} type="text" name={item} defaultValue={categories[index]} onChange={this.handleChange}></input>;
                    })}
                    {this.renderDuplicateMessage()}
                    <a className={this.state.duplicateMessage || this.state.disableSubmit ? "categorySubmitButton disabled" : "categorySubmitButton"} onClick={this.handleCategorySubmit}>Submit</a>
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderCategories(this.props.categories)}</div>
    }
}

CategorySettings.propTypes = {
    categories: PropTypes.array.isRequired,
    updateCategories: PropTypes.func.isRequired,
    updateUserCategories: PropTypes.func.isRequired,
    fetchCategoryData: PropTypes.func.isRequired,
    handleCategoryEdit: PropTypes.func.isRequired,
    deleteUserCategory: PropTypes.func.isRequired
}

export default CategorySettings;