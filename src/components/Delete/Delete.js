import React from 'react';
import './delete.css';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Modal from 'react-modal';
import InfoModal from '../infoModal';
import DatePicker from 'react-datepicker';
import { fetchCategoryData } from '../../store/actions';


class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryEditFlag: false,
            monthStartEditFlag: false,
            dateInputValue: undefined,
            categoryInputValue: undefined,
            amountInputValue: undefined,
            notesInputValue: undefined,
            modalIsOpen: false,
            infoModalHeader: '',
            infoModalContent: ''
        };
        this.handleDeleteEntriesClick = this.handleDeleteEntriesClick.bind(this);
        this.handleDeleteAllClick = this.handleDeleteAllClick.bind(this);
        this.handleYesDeleteAllClick = this.handleYesDeleteAllClick.bind(this);
        this.updateCategoryValue = this.updateCategoryValue.bind(this);
        this.updateAmountValue = this.updateAmountValue.bind(this);
        this.updateDateValue = this.updateDateValue.bind(this);
        this.updateNotesValue = this.updateNotesValue.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    updateDateValue(date) {
        this.setState({
            dateInputValue: date
        });
    }

    updateCategoryValue(selectedOption) {
        const value = selectedOption === null ? '' : selectedOption.value
        this.setState({
            categoryInputValue: value
        });
    }

    updateAmountValue(val) {
        const value = val === null ? '' : val
        this.setState({
            amountInputValue: value
        });
    }

    updateNotesValue(selectedOption) {
        const value = selectedOption === null ? '' : selectedOption.value
        this.setState({
            notesInputValue: value
        });
    }

    handleDeleteEntriesClick() {
        if (this.state.notesInputValue && this.state.amountInputValue && this.state.dateInputValue && this.state.categoryInputValue) {
            // delete from expense database
            this.props.deleteEntries(
                this.state.dateInputValue.format('YYYY-MM-DD'),
                this.state.categoryInputValue,
                Number(this.state.amountInputValue),
                this.state.notesInputValue
            );

            // delete category from user database if the cats in database = 1 (i.e. when we delete one, there will be none left)
            const catsInDB = _.filter(_.map(_.get(this.props, "dbData", []), obj => obj.category), cat => cat === this.state.categoryInputValue);
            if (catsInDB.length == 1) {
                this.props.deleteUserCategory(this.state.categoryInputValue);
            }

            // reset state
            this.setState({
                dateInputVlue: undefined,
                categoryInputValue: undefined,
                notesInputValue: undefined,
                amountInputValue: undefined
            })

        }
        return
    }

    handleYesDeleteAllClick() {
        this.props.deleteAll();
        this.props.updateUserCategories([]);
        this.handleCloseModal();
    }

    handleDeleteAllClick() {
        this.setState({
            infoModalHeader: 'Are You Sure?',
            infoModalContent: (<div>
                <h3>This will delete all entries in the database</h3>
                <a className="modalButton" onClick={this.handleYesDeleteAllClick}>Yes</a>
                <a className="modalButton" onClick={this.handleCloseModal}>No</a>
            </div>)
        });

        this.handleModalOpen();
    }

    handleCloseModal() {
        this.setState({ modalIsOpen: false });
    }

    handleModalOpen() {
        this.setState({ modalIsOpen: true })
    }

    includeDatesArr() {
        return _.map(_.get(this.props, 'dbData', []), obj => obj.date);
    }

    categoryOptions() {
        if (this.state.dateInputValue) {
            // moments were not updating as planned: _d value not matching _i value when state updates. format gives correct value. likely due to utc. 
            let formattedDateArr = _.map(this.props.dbData, obj => ({
                date: obj.date.format("DD-MM-YYYY"),
                category: obj.category
            }));
            let formattedDateInput = this.state.dateInputValue.format('DD-MM-YYYY');
            return _.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput }), obj => ({
                value: obj.category,
                label: obj.category.replace(/\b\w/g, l => l.toUpperCase())
            })), 'value');

        }
    }

    notesOptions() {
        if (this.state.dateInputValue && this.state.categoryInputValue) {
            // moments were not updating as planned: _d value not matching _i value when state updates. format gives correct value. likely due to utc. 
            let formattedDateArr = _.map(this.props.dbData, obj => ({
                date: obj.date.format("DD-MM-YYYY"),
                category: obj.category,
                notes: obj.notes
            }));
            let formattedDateInput = this.state.dateInputValue.format('DD-MM-YYYY');
            return _.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput, category: this.state.categoryInputValue }), obj => ({
                value: obj.notes,
                label: obj.notes
            })), 'value');
        }
    }

    amountOptions() {
        if (this.state.dateInputValue && this.state.categoryInputValue && this.state.notesInputValue) {
            // moments were not updating as planned: _d value not matching _i value when state updates. format gives correct value. likely due to utc. 
            let formattedDateArr = _.map(this.props.dbData, obj => ({
                date: obj.date.format("DD-MM-YYYY"),
                category: obj.category,
                notes: obj.notes,
                amount: obj.amount
            }));
            let formattedDateInput = this.state.dateInputValue.format('DD-MM-YYYY');
            return _.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput, category: this.state.categoryInputValue, notes: this.state.notesInputValue }), obj => ({
                value: obj.amount,
                label: obj.amount
            })), 'value');
        }
    }

    render() {
        return (
            <div className="deleteContainer">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.handleCloseModal}
                    className="myModalDialog"
                    overlayClassName="myOverlay"
                    contentLabel="Example Modal"
                    closeTimeoutMS={300}
                >
                    <InfoModal
                        closeModal={this.handleCloseModal}
                        headerContent={this.state.infoModalHeader}
                        modalMainContent={this.state.infoModalContent} />
                </Modal>
                <div className="deleteEntriesContainer">
                    <form className="deleteForm">
                        <div className="deleteDateInputContainer">
                            <h4>Date:</h4>
                            <DatePicker
                                onChange={this.updateDateValue}
                                selected={this.state.dateInputValue}
                                includeDates={this.includeDatesArr()}
                                placeholderText="Select a date"
                            />
                        </div>
                        <div className="deleteInputContainer">
                            <h4>Category:</h4>
                            <Select
                                name="deleteCategory"
                                clearable={true}
                                value={this.state.categoryInputValue}
                                onChange={this.updateCategoryValue}
                                disabled={this.state.dateInputValue ? false : true}
                                className="deleteSelect"
                                options={this.categoryOptions()}
                            />
                        </div>
                        <div className="deleteInputContainer">
                            <h4>Notes:</h4>
                            <Select
                                name="deleteNotes"
                                clearable={true}
                                value={this.state.notesInputValue}
                                disabled={this.state.categoryInputValue && this.state.dateInputValue ? false : true}
                                className="deleteSelect"
                                options={this.notesOptions()}
                                onChange={this.updateNotesValue}>
                            </Select>
                        </div>
                        <div className="deleteInputContainer">
                            <h4>Amount:</h4>
                            <Select
                                name="deleteAmount"
                                clearable={true}
                                simpleValue
                                value={this.state.amountInputValue}
                                disabled={this.state.categoryInputValue && this.state.dateInputValue && this.state.notesInputValue ? false : true}
                                className="deleteSelect"
                                options={this.amountOptions()}
                                onChange={this.updateAmountValue}></Select>
                        </div>
                    </form>
                    <button
                        className={this.state.categoryInputValue && this.state.dateInputValue && this.state.notesInputValue && this.state.amountInputValue ? "deleteButton" : "disabled deleteButton"}
                        onClick={this.handleDeleteEntriesClick}>Delete Entry</button>
                </div>
                <button className="deleteButton" onClick={this.handleDeleteAllClick}>Delete All</button>
            </div>
        )
    }
}

Delete.propTypes = {
    dbData: PropTypes.array.isRequired,
    deleteAll: PropTypes.func.isRequired,
    deleteEntries: PropTypes.func.isRequired
}

export default Delete;