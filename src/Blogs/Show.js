import { useHistory, useParams, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { Button, Card } from 'react-bootstrap';
import Navigation from "../Navigation";

const Show = () => {
    const { id } = useParams();
    const { data: blog, isLoading, error } = useFetch('http://127.0.0.1:8000/api/blogs/' + id);
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user-info'));

    const handleDelete = () => {
        fetch('http://127.0.0.1:8000/api/blogs/' + blog.id, {
            method: 'DELETE'
        })
        .then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="show">
            <Navigation />

            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && 
                <div className="d-flex justify-content-center">
                    <div className="col-md-6">
                        <Card>
                            <Card.Title className="text-center">
                                <h1>Post Details</h1>
                            </Card.Title>
                            <Card.Body>
                                {user.id === blog.user_id && 
                                    <div className="action">
                                        <Button variant="danger" className="float-right" size="sm" type="submit" onClick={ handleDelete }>Delete</Button>
                                        <Link className="btn btn-info btn-sm mx-1 float-right" to={`/blogs/${blog.id}/edit`}>Edit</Link>
                                    </div>
                                }
                                <h2>{ blog.title }</h2>
                                <p className="float-right">{blog.created_at}</p>
                                <p className="text-success">By {blog.user.name}</p>
                                <div>{ blog.description }</div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Show;