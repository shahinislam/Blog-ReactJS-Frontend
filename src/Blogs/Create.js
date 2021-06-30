import { Button, Card, Form } from 'react-bootstrap';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navigation from '../Navigation';

const Create = () => {
    const user = JSON.parse(localStorage.getItem('user-info'));
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        const user_id = user.id;

        const blog = { user_id, title, description };

        setIsLoading(true);

        fetch('http://127.0.0.1:8000/api/blogs', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(blog),
        })
            .then(() => {
                console.log('New post created');
                setIsLoading(false);
                // history.go(-1);
                history.push('/blogs');
            })
    }

    return (
        <div className="create">
            <Navigation />

            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <Card.Title className="text-center">
                            <h1>Create Post</h1>
                        </Card.Title>
                        <Card.Body>
                            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
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

                                {!isLoading &&
                                    <Button variant="success" type="submit" >
                                        Create Post
                                    </Button>
                                }
                                {isLoading &&
                                    <Button variant="secondary" type="submit" disabled>
                                        Creating Post...
                                    </Button>
                                }
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Create;