import React from 'react';
import './categorySettings.css';
import PropTypes from 'prop-types'
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/fontawesome-free-solid';

class CategorySettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCategories: this.props.categories.slice()
        };
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchCategoryData()
    }

    handleCategorySubmit() {
        // assembling object to pass to updateCategories
        let objToSubmit = {};
        let i;
        for (i = 0; i < this.props.categories.length; i++) {
            objToSubmit[this.props.categories[i]] = this.state.newCategories[i];
        }

        //dispatch actions to update categories of both mongoose collections
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
    }

    handleDeleteClick(category) {
        this.props.deleteUserCategory(category);
    }

    renderCategories(categories) {
        if (!this.props.categoryEditFlag) {
            return (
                <ul className="categoryList">
                    {_.map(categories, (item, index) => {
                        return (
                            <li className="categoryListItem" key={categories[index]}>
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
                        return <input key={categories[index]} type="text" name={item} defaultValue={categories[index]} onChange={this.handleChange}></input>;
                    })}
                    <a className="categorySubmitButton" onClick={this.handleCategorySubmit}>Submit</a>
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