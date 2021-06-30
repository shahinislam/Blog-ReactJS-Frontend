import useFetch from "./useFetch";
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from "../Navigation";

const Index = () => {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const [postNumber, setPostNumber] = useState(10);
    const { data: blogs, isLoading, error } = useFetch('http://127.0.0.1:8000/api/blogs/posts/' + postNumber);

    const handleClick = () => {
        setPostNumber(postNumber + 10);
    }
    
    return (
        <div className="index">
            <Navigation />
            
            <div className="d-flex justify-content-center mb-5">
            <div className="col-md-6">
                <div className="mb-3">
                    <Link to="/blogs/create" className="btn btn-success">Create Post</Link>
                </div>
                {error && <p>{ error }</p>}
                {isLoading && <h2>Loading...</h2>}
                {blogs && 
                    blogs.map( (blog, index) => (
                        <Card className="mb-3 blog-scale" key={blog.id}>
                            <Card.Body>
                                <h2 className="text-center">{blog.title}</h2>
                                <p className="float-right">{blog.created_at}</p>
                                <p className="text-success">By {blog.user.name}</p>
                                <p>{blog.description}</p>
                                <div className="float-right">
                                    <Link to={`/blogs/${blog.id}`}>Read more...</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }

                <div className="text-center">
                    <Button variant="secondary" onClick={ handleClick }>Load More...</Button>
                </div>

            </div>
        </div>
        </div>
    )
}         

export default Index;