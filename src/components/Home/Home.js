import { useState, useEffect, useCallback } from "react";
import Course from "./Course"
import GreenPassList from "./GreenPassList";

import "./Home.css";

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [greenPasses, setGreenPasses] = useState([]);
    const [hasGreenPass,setHasGreenPass]=useState()
    let currentUser = JSON.parse(localStorage.getItem("user"))
    let collection = (!currentUser?.isAdmin) ? "Courses" : "GreenPassStatus"
    const fetchUsersHandler = useCallback(async () => {
        try {
            const response = await fetch(
                `https://react-solution-test-3-default-rtdb.firebaseio.com/${collection}.json`
            );
            if (!response.ok) {
                throw new Error("Something went wrong!");
            } let loadedCourses = []
            const data = await response.json();

            for (const key in data) {
                if (!currentUser?.isAdmin) {
                    loadedCourses.push({
                        id: key,
                        courseName: data[key].courseName,
                    });
                }
                else {
                    loadedCourses.push({
                        id: key,
                        email: data[key].email,
                        status: data[key].status
                    });
                }

            }
            setCourses(loadedCourses)

            // ****************************************************************
            const response2 = await fetch(
                `https://react-solution-test-3-default-rtdb.firebaseio.com/GreenPassStatus.json`
            );
            if (!response2.ok) {
                throw new Error("Something went wrong!");
            } let loadedCourses2 = []
            const data2 = await response2.json();

            for (const key in data2) {
                    loadedCourses2.push({
                        id: key,
                        courseName: data2[key].courseName,
                    });
            }
            setGreenPasses(greenPasses)
            let userfoundLocal= greenPasses.find((element) => {
                return element.email === currentUser.email ;
              })
              console.log(userfoundLocal.status);

        } catch (error) { }
        // *******************************
        // try {
           
            //   setHasGreenPass
        
    }, []);

    useEffect(() => {
        fetchUsersHandler();
    }, [fetchUsersHandler]);

    const approveGreenPass= async (val) =>{
        console.log("Approve",val);
            
        try {
            const response = await fetch(
              `https://react-solution-test-3-default-rtdb.firebaseio.com//GreenPassStatus/${val}/.json`,
              {
                method: "PATCH",
                body: JSON.stringify({status:"Approved"}),
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
    const rejectGreenPass= async (val) =>{
        console.log("reject",val);
               
        try {
            const response = await fetch(
              `https://react-solution-test-3-default-rtdb.firebaseio.com//GreenPassStatus/${val}/.json`,
              {
                method: "PATCH",
                body: JSON.stringify({status:"Rejected"}),
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

    let content;
    if (!currentUser?.isAdmin) {
        content = <p>Found no Courses.</p>;

        if (courses.length > 0) {
            content = <ol >
                {courses.map((course) => (
                    <Course 
                        key={course.id}
                        title={course.courseName}
                    />
                ))}
            </ol>
        }
    }
    else {
        if (courses.length > 0) {
            content = <ol className="listItem">
                {courses.map((course) => (
                    <GreenPassList
                        key={course.id}
                        id={course.id}
                        email={course.email}
                        status={course.status}
                        approveFunction={approveGreenPass}
                        rejectFunction={rejectGreenPass}
                    />
                ))}
                
            </ol>
        }
    }


    return (
        <div >
            {content}
        </div>
    )
}
export default Home;