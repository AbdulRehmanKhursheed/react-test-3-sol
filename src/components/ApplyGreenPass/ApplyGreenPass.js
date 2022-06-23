import "./ApplyGreenPass.css"
import { useState, useEffect, useCallback } from "react";
const ApplyGreenPass = () =>{
    const [greenPass, setGreenPass] = useState([]);
    const [greenPassStatus, setGreenPassStatus] = useState([]);
    const fetchUsersHandler = useCallback(async () => {
        try {
            const response = await fetch(
                "https://react-solution-test-3-default-rtdb.firebaseio.com/GreenPassStatus.json"
            );
            if (!response.ok) {
                throw new Error("Something went wrong!");
            } let loadedGreenPass = []
            const data = await response.json();
            for (const key in data) {
                loadedGreenPass.push({
                    id: key,
                    greenPassStatus: data[key].greenPassStatus,
                });
            }
            setGreenPass(loadedGreenPass)
            let userDetails= localStorage.getItem("user")
            console.log(userDetails);
            setGreenPassStatus(
                loadedGreenPass.find((element) => {
                  console.log(element.email === userDetails.email);
                  return element.email === userDetails.email;
                }))
                console.log(greenPassStatus);
        } catch (error) { }
    }, []);

    useEffect(() => {
        fetchUsersHandler();
    }, [fetchUsersHandler]);

    const applyGreenPassHandler = async () =>{
        let userDetails= JSON.parse(localStorage.getItem("user"));
        
        let body = {
            email: userDetails.email,
            status:"Pending"
          };
          try {
            const response = await fetch(
              "https://react-solution-test-3-default-rtdb.firebaseio.com/GreenPassStatus.json",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            console.log(data);
          } catch {
            console.log("Some error occured!");
          }
    }
    let content = (!greenPassStatus || (greenPassStatus !== "Pending" || greenPassStatus !== "Approved") ) && <button className="blueButton" onClick={applyGreenPassHandler}>Apply Green Pass</button>

    if (greenPassStatus.length > 0) {
        content = <p>You have already applied.</p>;
    }
    return(
        <div>
           {content}
        </div>
    )
}
export default ApplyGreenPass;