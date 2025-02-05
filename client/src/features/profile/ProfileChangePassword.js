import './Profile.css'

function ProfileChangePassword({ setOldPassword, setNewPassword, setConfirmationPassword, onSubmit }) {

    return (
        <div className="profile-change-password">
            <input type="password" placeholder='Old password' onChange={(e) => setOldPassword(e.target.value)}></input>
            <input type="password" placeholder='New password' onChange={(e) => setNewPassword(e.target.value)}></input>
            <input type="password" placeholder='Confirm new password' onChange={(e) => setConfirmationPassword(e.target.value)}></input>
            <button onClick={onSubmit}>Save</button>
        </div>
    )
}

export default ProfileChangePassword