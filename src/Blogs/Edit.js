import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap';
import Navigation from "../Navigation";

const Edit = () => {
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user-info'));

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs/' + id + '/edit')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        const blog = { title, description };

        // setIsLoading(true);

        fetch('http://127.0.0.1:8000/api/blogs/' + id, {
            method: 'PATCH',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(blog),
        })
            .then(() => {
                console.log('Post Updated');
                history.push('/blogs');
            })
    }

    return (
        <div className="edit">
            <Navigation />
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        required
                                        placeholder="Enter Description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="info" type="submit" >
                                    Update Post
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Edit;