import { Route } from 'react-router-dom';
import React from 'react';
import Header from '../Header/Header';
import Table from '../Table';
import Modal from 'react-modal';
import Sidebar from '../Sidebar/Sidebar';
import NewExpense from '../NewExpense';
import CategoryGraph from '../CategoryGraph';
import Home from '../Home';
import Settings from '../Settings';
import './app.css';
import MonthlyGraph from '../MonthlyGraph';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            modalIsOpen: false
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        Modal.setAppElement('#root');
    }

    //componentWillMount() {
    //    this.props.fetchMonthStartDay('bortojac');
    //}

    handleCloseModal() {
        this.setState({modalIsOpen: false});
    }

    handleModalOpen() {
        ////code to render the new expense forms
        
        // open the modal
        this.setState({modalIsOpen: true})
    }

    render() {
        return (
            <div id="container">
                <Header />
                <div id="mainContainer">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.handleCloseModal}
                        className="myModalDialog"
                        overlayClassName="myOverlay"
                        contentLabel="Example Modal"
                        closeTimeoutMS={300}
                    >
                        <NewExpense closeModal={this.handleCloseModal} />
                    </Modal>
                    <aside className="sidebarContainer">
                        <Sidebar openModal={this.handleModalOpen}/>
                    </aside>
                    <main>
                        <Route exact path="/" component={Home} /> 
                        <Route path="/settings" component={Settings} />
                    </main>
                </div>
            </div>
        )
    }
}

export default App;