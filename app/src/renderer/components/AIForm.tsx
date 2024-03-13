import {useState} from "react";

function AIForm(props) {
    const [filepath, setFilePath] = useState("");
    const [fennotation, setFenNotation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.handleSubmit(filepath, fennotation);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">SUBMIT</button>
                File path: <input
                id="fileinput"
                value={filepath}
                onChange={(e) => setFilePath(e.target.value)}
            />
                Fen board: <input
                id="feninput"
                value={fennotation}
                onChange={(e) => setFenNotation(e.target.value)}
            /> (optional)
            </form>
        </div>
    );
}

export default AIForm;
