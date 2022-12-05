import React from 'react'
import ArtworkCardDetail from '../../components/ArtworkCardDetail'
import { Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const ObjectID = () => {
    const router = useRouter()
    const { objectID } = router.query;
    return (
        <Row>
            <Col>
                   <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    )
}

export default ObjectID
