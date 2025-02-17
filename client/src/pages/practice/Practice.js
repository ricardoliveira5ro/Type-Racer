import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

function Practice() {
    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            <Race title={'Practice'} />
        </div>
    );
}

export default Practice;