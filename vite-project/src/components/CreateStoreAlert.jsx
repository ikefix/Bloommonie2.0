import {
  FaStore,
  FaInfoCircle
} from 'react-icons/fa';
import '../Css/createStoreAlert.css';

const CreateStoreAlert = () => {
    return (
        <>
        <div className="create-store-alert-inline">
            <div className="alert-content-inline">
                <FaInfoCircle className="alert-icon-inline" />
                <div className="alert-text-inline">
                    <h3>No store found</h3>
                    <p>Create your first store to get started with Inventory Management</p>
                </div>
            </div>
            <a href="/create-store" className="create-store-btn-inline">
                <FaStore />
                Create Store
            </a>
        </div>
        </>
    )
}

export default CreateStoreAlert;