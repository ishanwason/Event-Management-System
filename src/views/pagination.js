import React from 'react';
import { Pagination, PaginationLink, PaginationItem } from 'reactstrap'


const PaginationComponent = (props) => {
    const { totalPages, currentPage, getEventByPages } = props;

    const getPages = () => {
        const content = [];
        for (let i = 1; i <= totalPages; i++)
            content.push(<PaginationItem key={i} active={i === currentPage} onClick={() => getEventByPages(i)}>
                <PaginationLink >
                    {i}
                </PaginationLink>
            </PaginationItem>)
        return content;
    }

    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem onClick={() => getEventByPages(1)} disabled={currentPage === 1}>
                <PaginationLink first />
            </PaginationItem>
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => getEventByPages(currentPage - 1)} />
            </PaginationItem>
            {getPages()}
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => getEventByPages(currentPage + 1)} />
            </PaginationItem>
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink last onClick={() => getEventByPages(totalPages)} />
            </PaginationItem>
        </Pagination>
    )
}

export default PaginationComponent;