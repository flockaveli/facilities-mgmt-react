import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import RequestList from './RequestList'

const FmFilter = ({
    isFetching,
    requests,
    filterStatus,
    filterCategory,
    filterPriority,
    searchTerm
}) => {
    const filteredRequests = requests.filter(request => {
        return filterStatus ? request.status === filterStatus : true
    }).filter(request => {
        return filterCategory ? request.category === filterCategory : true
    }).filter(request => {
        return filterPriority ? request.priority === filterPriority : true
    }).filter(request => {
        return request.description.toLowerCase().includes(searchTerm) || request.name.toLowerCase().includes(searchTerm) || request.category.toLowerCase().includes(searchTerm)
    })
    return (
        < RequestList requests={ filteredRequests } isFetching={ isFetching } />
    )
}
export default FmFilter