import React, {useState} from "react";
import useFetch from "../../hooks/useFetch.js";
import {viewActivities} from "../../services/dashboardService.js";
import Table from "../../components/common/Table.jsx";

const Activities = ()=>{
    const {data, loading, error} = useFetch(viewActivities);

    if (loading) return <p>Loading activities...</p>;
    if (error) return <p>Error: {error}</p>;

    let columns = [
        {key: "actionType", header: "Action Type"},
        {key: "resourceType", header: "Resource Type"},
        {key: "resourceId", header: "Resource Id"},
        {key: "method", header: "Method"},
        {key: "timestamp", header: "Time"}
    ]

    return (
        <div>
            {!loading && !error && data.length === 0 && <p>There are no data at the moment.</p>}
            {!loading && !error && data.length > 0 && (
                <Table data={data} columns={columns} actions={actions}/>
            )}
        </div>
    );
};

export default Activities;