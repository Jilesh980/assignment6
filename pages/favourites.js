import { favouritesAtom } from "../store"
import { useAtom } from "jotai"
import { Row, Col, Card } from "react-bootstrap"
import ArtworkCard from "../components/ArtworkCard"

const Favourites = () => {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    return (
        <>
            <Row className="gy-4">
                {
                    favouritesList.length > 0 ? favouritesList.map(objectID => {
                        return (
                            <Col lg={3} key={objectID}>
                                <ArtworkCard objectID={objectID} />
                            </Col>
                        )
                    }) : <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try adding some new artwork to the list.
                        </Card.Body>
                    </Card>
                }
            </Row>
        </>
    )
}

export default Favourites
