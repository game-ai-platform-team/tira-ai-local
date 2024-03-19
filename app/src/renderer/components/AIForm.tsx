import {useState} from "react";

function AIForm(props: { handleSubmit: (filepath: string, fennotation: string) => void }) {
    const [filepath, setFilePath] = useState("");
    const [fennotation, setFenNotation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.handleSubmit(filepath, fennotation);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit" id="submit">SUBMIT</button>
                File path: <input
                id="fileinput"
                value={filepath}
                onChange={(e) => setFilePath(e.target.value)}
            />
                Set board FEN: <input
                id="feninput"
                value={fennotation}
                onChange={(e) => setFenNotation(e.target.value)}
            /> (empty for starting position)
            </form>
        </div>
    );
}

export default AIForm;
