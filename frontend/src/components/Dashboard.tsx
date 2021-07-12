import React from 'react';
import { Container } from "react-bootstrap"
import UserAuth from "../hooks/UserAuth";

export default function Dashboard(code:string) {
    const accessToken = UserAuth(code)
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            {code}
        </Container>
    )
}
