import React from 'react';
import Header from '../Header/Header';
import Modal from 'react-modal';
import Sidebar from '../Sidebar/Sidebar';
import './app.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            modalIsOpen: false
        };
        //this.handleSidebarView = this.handleSidebarView.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        Modal.setAppElement('#root');
    }

    /*handleSidebarView() {
        console.log('worked');
        this.setState({sidebarOpen: !this.state.sidebarOpen});
    }*/

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
            <Header  />
            <div id="mainContainer">
            <Sidebar openModal={this.handleModalOpen}/>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.handleCloseModal}
                className="myModalDialog"
                overlayClassName="myOverlay"
                contentLabel="Example Modal"
                closeTimeoutMS={300}
            >
            </Modal>
            <main>
                {//graphs and other stuff
                }
                </main>
                </div>
            </div>
        )
}
}

export default App;