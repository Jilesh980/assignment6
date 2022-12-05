import React from 'react'
import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Link from 'next/link'

const ArtworkCard = props => {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`)
    if (error) {
        return (
            <Error statusCode={404}>Try searching for something else.</Error>
        )
    } else if (data) {
        const link = `artwork/${props.objectID}`
        return (
            <Card>
                <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"} />
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"} <br />
                        <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br />
                        <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br />
                    </Card.Text>
                    <Link href={link} passHref>
                            <Button variant="outline-primary" className='btn'><strong>ID: </strong>{props.objectID}</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }

    return (null)
}
export default ArtworkCard
