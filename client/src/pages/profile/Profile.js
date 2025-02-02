import Header from "../../components/Header/Header";
import ProfileActions from "../../features/profile/ProfileActions";
import ProfileInfo from "../../features/profile/ProfileInfo";

const Profile = () => {

    return (
        <div className="flex flex-col items-center gap-y-8 px-10 py-7">
            <Header />
            <div>
                <ProfileInfo />
                <ProfileActions />
            </div>
        </div>
    )
}

export default Profile;