import React from 'react';
import './categorySettings.css';
import _ from 'lodash';

class CategorySettings extends React.Component {
    constructor(props) {
        super(props);
        // state needs to be dynamic to whatever number of categories are made in the newExpenseModal. 
        this.state = {
            newCategories: this.props.categories.slice()
        };
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    // initialize the state as a copy of the prop categories
    /*componentWillReceiveProps() {
        this.setState({newCategories: this.props.categories.slice()})
    }*/
    componentDidMount() {
        this.props.fetchCategoryData()
    }

    handleCategorySubmit() {
        // assembling object to pass to updateCategories
        let objToSubmit = {};
        let i;
        for(i = 0; i < this.props.categories.length; i++) {
            objToSubmit[this.props.categories[i]] = this.state.newCategories[i];
        }
        console.log(objToSubmit);

        //dispatch actions to update categories of both mongoose collections
        this.props.updateCategories(objToSubmit);
        this.props.updateUserCategories(objToSubmit);
        //fetch updated data
        this.props.fetchCategoryData();
        this.props.fetchUserInfo();
        
        this.props.handleCategoryEdit();
    }
    
    handleChange(e) {
        // we need to update only the part of the state that is the current target
        
       let arr = this.state.newCategories.slice();
        arr[this.props.categories.indexOf(e.target.name)] = e.target.value;
        this.setState({newCategories: arr}); 

       console.log(this.state.newCategories);
       //console.log(this.props.categories);
    }

    handleDeleteClick(category) {
        console.log(category);
        this.props.deleteUserCategory(category);
    }
    
    renderCategories(categories) {
        if(!this.props.categoryEditFlag) {
        return (
            <ul className="categoryList">
                {_.map(categories, (item, index) => {
                    return (
                    <li className="categoryListItem" key={index}>
                        <div className="categoryText">
                            {item}
                        </div>
                        <a className="deleteLink" onClick={() => this.handleDeleteClick(item)}>-</a>
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
            //console.log(item);
            return <input type="text" name={item} defaultValue={this.props.categories[index]} onChange={this.handleChange}></input>;
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

export default CategorySettings;