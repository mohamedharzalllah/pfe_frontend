import { useParams } from "react-router-dom";
import ProblemDetails from "../../components/problem/description";
import Navbar from "../../components/Navbar";
import TestCasePage from "../../components/problem/testcase";
import CodeEditor from "../../components/problem/codeeditorpage";
import "../../css/bootstrap.min.css"


const ProblemPage = () => {
    const { id } = useParams();

    return (
        <div>
            <Navbar />
            {id && (
                <div className="container-fluid">
                    <div className="row">
                        {/* Left Section: Problem Details and Test Cases */}
                        <div className="col-md-6">
                            <ProblemDetails id={id} />
                            <TestCasePage id={id} />
                        </div>

                        {/* Right Section: Code Editor */}
                        <div className="col-md-6">
                            <CodeEditor id={id} />
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default ProblemPage