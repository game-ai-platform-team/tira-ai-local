import {useState} from "react";

function AIForm(props: { handleSubmit: (filepath: string, fennotation: string, runSetup: boolean) => void, showFen: boolean }) {
    const [filepath, setFilePath] = useState("");
    const [fennotation, setFenNotation] = useState("");
    const [runSetup, setRunSetup] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        props.handleSubmit(filepath, fennotation, runSetup);
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
                {props.showFen && (
                    <>
                        Set board FEN: <input
                            id="feninput"
                            value={fennotation}
                            onChange={(e) => setFenNotation(e.target.value)}
                        /> (empty for starting position)
                    </>
                )}
                <label htmlFor="run-setup">Run setup.sh?</label>
                <input type="checkbox" id="run-setup" onChange={(e) => setRunSetup(e.target.value === "false")}
                       value={"" + runSetup}/>
            </form>
        </div>
    );
}

export default AIForm;
