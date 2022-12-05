import React from 'react'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { Card, Row, Col } from 'react-bootstrap'
import ArtworkCard from '../../components/ArtworkCard'
import { Pagination } from 'react-bootstrap'
import validObjectIDList from '../../public/data/validObjectIDList.json'

const Index = () => {
    const PER_PAGE = 12
    const [artworkList, setArtworkList] = useState()
    const [page, setPage] = useState(1)
    const router = useRouter()
    let finalQuery = router.asPath.split('?')[1];
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)
    let filteredResult = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x))

    function previousPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    function nextPage() {
        if (page < artworkList.length) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        if (data) {
            let results = []
            for (let i = 0; i < filteredResult.length; i += PER_PAGE) {
                const chunk = filteredResult.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
        }
        setPage(1)
    }, [data])

    if (error) {
        return (
            <Error statusCode={404} />
        )
    } else if (artworkList) {
        return (
            <>
                <Row className="gy-4">
                    {artworkList.length > 0 ? artworkList[page - 1].map(objectID => {
                        return (
                            <Col lg={3} key={objectID}>
                                <ArtworkCard objectID={objectID} />
                            </Col>
                        )
                    }) : <Card>
                        <Card.Body>
                                <h4>Nothing Here</h4>
                                Try searching for something else.
                        </Card.Body>
                    </Card>}
                </Row>
                <br />
                <br />
                {
                    artworkList.length > 0 ?
                        <Row>
                            <Col>
                                <Pagination>
                                    <Pagination.Prev onClick={previousPage} />
                                    <Pagination.Item>{page}</Pagination.Item>
                                    <Pagination.Next onClick={nextPage} />
                                </Pagination>
                            </Col>
                        </Row> : ""
                }
            </>
        )
    }
    else {
        return (null)
    }
}

export default Index
