import { Button, Card, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Meta } = Card;

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/instructor/course/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched course data:", data); // Add this line for logging
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Skeleton active />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={
          <img alt="course" src={course.courseImage} style={{ height: 300 }} />
        }
      >
        <Meta title={course.courseName} description={course.courseDetails} />
        <div className="mt-4">
          <p className="text-lg font-bold">Price: ${course.price}</p>
          <p className="text-lg">Instructor: {course.instructorId}</p>
          <Button type="primary" className="mt-4">
            Enroll Now
          </Button>
          {course.content && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Additional Content:</p>
              <p>{course.content.contentDescription}</p>
              <a
                href={course.content.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Download Content
              </a>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Course;
