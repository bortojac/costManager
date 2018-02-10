import React from 'react';
import Header from '../Header/Header';
import Table from '../Table';
import Modal from 'react-modal';
import Sidebar from '../Sidebar/Sidebar';
import NewExpense from '../NewExpense';
import CategoryGraph from '../CategoryGraph';
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
        this.props.fetchTableData();
        this.props.fetchCategoryData();
        this.props.fetchMonthlyData();
    }

    handleCloseModal() {
        this.setState({modalIsOpen: false})
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
                        <Sidebar openModal={this.handleModalOpen} />
                    </aside>
                    <main>
                        <div className="row1">
                            <h1>{`You've Spent $${this.props.totalSum.toLocaleString()} this month`}</h1>
                        </div>
                        <div className="row2">
                            <CategoryGraph />
                            <MonthlyGraph />
                        </div>
                        <div className="row3">
                            <Table />
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default App;