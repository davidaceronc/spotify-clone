import React from 'react';
import { Container } from "react-bootstrap"

export default function Dashboard({code}:any) {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            {code}
        </Container>
    )
}
