//import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { searchHistoryAtom } from '../store'
import { useAtom } from 'jotai'

export default function MainNav() {
    const [search, setSearch] = useState('');
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const [isExpanded, setExpanded] = useState(false);
    const router = useRouter()

    function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        if (search) {
            setExpanded(false);
            setSearchHistory(current => [...current, `title=true&q=${search}`])
            router.push(`/artwork?title=true&q=${search}`)
        }
    }

    return (
        <>
            <Navbar className="fixed-top" bg="primary" variant="dark" expand='lg' expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>JILESH PATEL</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={e => setExpanded(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" >
                            <Link href="/" passHref legacyBehavior>
                                {/* <a>Home</a> */}
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;
                        <Form className="d-flex" onSubmit={submitForm}>
                                 <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                       />
                            <Button type="submit" className="btn btn-success">Search</Button>
                        </Form>
                        &nbsp;
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={e => setExpanded(false)} active={router.pathname === "/favorites"} > Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={e => setExpanded(false)} active={router.pathname === "/history"} > Search History</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <br />
            <br />
            <br />
        </>
    )
}
