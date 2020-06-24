import React from 'react'
import { Pagination, Row, Col, Container } from 'react-bootstrap'

const fmPagination = ({ itemsPerPage, totalRequests, currentPage, paginate, next, prev }) => {
    const pageNumbers = []
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(Math.ceil(totalRequests / itemsPerPage), currentPage + 2); i++) {
        pageNumbers.push(i)
    }
    return (
        <Pagination>
            <Pagination.First onClick={ () => paginate(1) } />
            <Pagination.Prev onClick={ () => prev() } />
            { pageNumbers.map(number => (<Pagination.Item onClick={ () => paginate(number) }>{ number }</Pagination.Item>)) }
            <Pagination.Next onClick={ () => next() } />
            <Pagination.Last onClick={ () => paginate(totalRequests) } />
        </Pagination>
    )
}
export default fmPagination