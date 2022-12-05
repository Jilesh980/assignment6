import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { atom } from 'jotai'
import { searchHistoryAtom } from '../store'
import { useAtom } from 'jotai'

const AdvancedSearch = () => {
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ })

    function submitForm(data) {
        let queryString = ""
        queryString += `${data.searchBy}=true`
        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`
        }
        if (data.medium) {
            queryString += `&medium=${data.medium}`
        }
        queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`
        setSearchHistory(curr => [...curr, queryString])
        router.push(`/artwork?${queryString}`)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control type="text" {...register('q', { required: true })} className={errors.q && "is-invalid"} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>Search By</Form.Label>
                        <Form.Select className="mb-3" {...register('searchBy')} >
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" {...register('geoLocation')} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" {...register('medium')} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            {...register('isHighlight')}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            {...register('isOnView')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AdvancedSearch
