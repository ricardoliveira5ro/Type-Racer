import './Reset.css'

function ResetForm({ setNewPassword, setConfirmationPassword, onSubmit }) {

    return (
        <form className="reset-password">
            <input type="password" placeholder='New password' onChange={(e) => setNewPassword(e.target.value)}></input>
            <input type="password" placeholder='Confirm new password' onChange={(e) => setConfirmationPassword(e.target.value)}></input>
            <button onClick={onSubmit}>Save</button>
        </form>
    )
}

export default ResetForm