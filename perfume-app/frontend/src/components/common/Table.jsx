import React, {useEffect, useState} from 'react';
import '../../styles/components/Table.css';
import {useSearchParams} from "react-router-dom";

const Table = ({ data, columns, actions }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchParams] = useSearchParams();
    const highlightId = searchParams.get("highlightId"); // Get the ID to highlight
    const [isHighlighted, setIsHighlighted] = useState(false);

    console.log(highlightId)

    useEffect(() => {
        if(highlightId) {
            setIsHighlighted(true);
            const timeout = setTimeout(()=>{
                setIsHighlighted(false);
            }, 1400);
            return () => clearTimeout(timeout);
        }
    }, []);


    // Sortingw
    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key} onClick={() => handleSort(column.key)}>
                            {column.header}
                            {sortConfig.key === column.key && (
                                <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                            )}
                        </th>
                    ))}
                    {actions && <th></th>}
                </tr>
                </thead>
                <tbody>
                {currentItems.map((row, rowIndex) => (
                    <tr key={rowIndex} className={isHighlighted && row._id === highlightId ? "highlighted" : ""}>
                        {columns.map((column) => {
                            // Handle nested properties
                            const keys = column.key.split('.');
                            const value = keys.reduce((acc, key) => acc?.[key], row);

                            return <td key={column.key}>{value || '-'}</td>;
                        })}
                        {actions && (
                            <td className="actions">
                                {actions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => action.handler(row)}
                                        className={action.className}
                                        title={action.title} // Add title for accessibility
                                    >
                                        {action.icon ? (
                                            <img
                                                src={action.icon}
                                                alt={action.label}
                                                className="action-icon"
                                            />
                                        ) : (
                                            action.label
                                        )}
                                    </button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            {data.length > itemsPerPage && <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= data.length}
                >
                    Next
                </button>
            </div>}
        </div>
    );
};

export default Table;