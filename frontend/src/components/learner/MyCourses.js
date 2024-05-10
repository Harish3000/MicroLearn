import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MyCourses() {

    const [learners, setLearners] = useState([]); // State to store learners
    const [error, setError] = useState(null); // State to store any errors

    useEffect(() => {
        const fetchLearners = async () => {
        try {
            const response = await axios.get('http://localhost:9094/learner/get-all');
            setLearners(response.data);
        } catch (err) {
            setError(err.message);
        }
        };

        fetchLearners();
    }, []);

  return (
    <div>
        <div>
            <h2>My Courses</h2>
        </div>
        <div>
        <table>
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>Learner ID</th>
                        <th>Course ID</th>
                        <th>Payment ID</th>
                    </tr>
                </thead>
                <tbody>
                    {learners.map((learner) => (
                        <tr key={learner.enrollmentId}>
                            <td>{learner.enrollmentId}</td>
                            <td>{learner.learnerId}</td>
                            <td>{learner.courseId}</td>
                            <td>{learner.paymentId}</td>
                            <button>View Page</button>
                            <button>Update</button>
                            <button>Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default MyCourses