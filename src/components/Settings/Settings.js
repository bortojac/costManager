import React from 'react';
import './settings.css';
import _ from 'lodash';
import moment from 'moment';
import CategorySettings from '../CategorySettings';
import MonthStartDate from '../MonthStartDate';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import DeleteInputs from '../Delete';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-regular';
import { faInfo } from '@fortawesome/fontawesome-free-solid';
import Modal from 'react-modal';
import InfoModal from '../infoModal';


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryEditFlag: false,
            monthStartEditFlag: false,
            dateInputValue: moment(),
            categoryInputValue: undefined,
            amountInputValue: 0,
            notesInputText: 'What was the expense on?',
            options: _.map(this.props.categoryOptions, category => (
                {
                    value: category,
                    label: category.replace(/\b\w/g, l => l.toUpperCase())
                })
            ),
            modalIsOpen: false,
            infoModalHeader: '',
            infoModalContent: ''
        };
        this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
        this.handleMonthStartEdit = this.handleMonthStartEdit.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleCategorySettingsInfoClick = this.handleCategorySettingsInfoClick.bind(this);
        this.handleMonthStartInfoClick = this.handleMonthStartInfoClick.bind(this);
        this.handleDeleteInfoClick = this.handleDeleteInfoClick.bind(this);
        Modal.setAppElement('#root');
    }

    //componentWillMount() {
    //    this.props.fetchMonthStartDay('bortojac');
    //}

    handleCloseModal() {
        this.setState({ modalIsOpen: false });
    }

    handleModalOpen() {
        ////code to render the new expense forms
        // open the modal
        this.setState({ modalIsOpen: true })
    }

    handleCategoryEdit() {
        this.setState({ categoryEditFlag: !this.state.categoryEditFlag });
    }

    handleMonthStartEdit() {
        this.setState({ monthStartEditFlag: !this.state.monthStartEditFlag });
        //console.log(this.state.monthStartEditFlag);
    }

    handleCategorySettingsInfoClick() {
        this.setState({
            infoModalHeader: 'Category Settings Information',
            infoModalContent: <div>
                <h4>To edit your spending categories:</h4>
                <ul>
                    <li>Click the clipboard icon in the top right corner, edit categories as desired, and press submit</li>
                </ul>
                <h4>To delete spending categories:</h4>
                <ul>
                    <li>Click the red "-" next to the category you wish to delete. (NOTE: this will remove all entries in the database with this category)</li>
                </ul>
            </div>
        });
        this.handleModalOpen();
    }

    handleMonthStartInfoClick() {
        this.setState({
            infoModalHeader: 'Month Start Date Information',
            infoModalContent: <div>
                <p>This application allows you to decide when your monthly budget period begins. For example if you set the month start date to the 15th, the app will calculate your monthly spend from the 15th of the month until the 14th of the following month. This allows you to line up your budgeting with any credit card statement periods or paycheck dates.</p>
                <h4>To edit your month start date:</h4>
                <ul>
                    <li>Click the clipboard icon in the top right corner, set the desired month start date, and press submit</li>
                </ul>
            </div>
        });
        this.handleModalOpen();
    }

    handleDeleteInfoClick() {
        this.setState({
            infoModalHeader: 'Delete Entries Information',
            infoModalContent: <div>
                <h4>You may delete entries from the database one at a time, or you may delete all entries at once</h4>
                <h4>To delete entries one at a time:</h4>
                <ul>
                    <li>Click the clipboard icon in the top right corner, provide the date, category, amount, and notes of the entry you wish you delete and press Delete Entry</li>
                </ul>
                <h4>To delete all entries at once:</h4>
                <ul>
                    <li>Click Delete All (NOTE: it almost goes without saying, but this will delete all entries in the database)</li>
                </ul>
            </div>
        });
        this.handleModalOpen();
    }

    renderIcons(flag, handleFunc) {
        if (flag) {
            console.log(flag);
            console.log('true');
            return (<a className="editLink" onClick={handleFunc}><FontAwesomeIcon icon={faTimes} /></a>);
        }
        else {
            console.log(flag);
            return (<a className="editLink" onClick={handleFunc}><FontAwesomeIcon icon={faEdit} /></a>);
        }
    }

    render() {
        //console.log(moment().endOf('month').format('DD'));
        return (
            <div className="settingsContainer">
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
                <div className="settingsRow1">
                    <h1>Settings</h1>
                </div>
                <div className="settingsRow2">
                    <section className="settingsRow2Col1">
                        <h2>Your Spending Categories</h2>
                        <div className="settingsRow2Col1Content">
                            {this.renderIcons(this.state.categoryEditFlag, this.handleCategoryEdit)}
                            <a className="infoLink" onClick={this.handleCategorySettingsInfoClick}><FontAwesomeIcon icon={faInfo} /></a>
                            <CategorySettings handleCategoryEdit={this.handleCategoryEdit}
                                categoryEditFlag={this.state.categoryEditFlag} />
                        </div>
                    </section>
                    <section className="settingsRow2Col2">
                        <h2>Your Month Start Date</h2>
                        <div className="settingsRow2Col2Content">
                            {this.renderIcons(this.state.monthStartEditFlag, this.handleMonthStartEdit)}
                            <a className="infoLink" onClick={this.handleMonthStartInfoClick}><FontAwesomeIcon icon={faInfo} /></a>
                            <MonthStartDate handleMonthStartEdit={this.handleMonthStartEdit}
                                monthStartEditFlag={this.state.monthStartEditFlag} />
                        </div>
                    </section>
                    <section className="settingsRow2Col3">
                        <h2>Delete Entries</h2>
                        <div className="settingsRow2Col3Content">
                            <a className="infoLink" onClick={this.handleDeleteInfoClick}><FontAwesomeIcon icon={faInfo} /></a>
                            <DeleteInputs />
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Settings;