// src/Report.js (or any other component)
import React, { useState, useEffect } from 'react';
import { getReports, createReport } from './services/api';

function Report() {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({ month: '', outreach_programs_current: 0, outreach_programs_previous: 0, outreach_programs_variance: 0, souls_won_current: 0, souls_won_previous: 0, souls_won_variance: 0 });

    useEffect(() => {
        // Fetch the reports on initial load
        getReports()
            .then((data) => setReports(data))
            .catch((error) => console.error('Error fetching reports:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createReport(newReport)
            .then((createdReport) => {
                setReports((prevReports) => [...prevReports, createdReport]);
                setNewReport({ month: '', outreach_programs_current: 0, outreach_programs_previous: 0, outreach_programs_variance: 0, souls_won_current: 0, souls_won_previous: 0, souls_won_variance: 0 });
            })
            .catch((error) => console.error('Error creating report:', error));
    };

    return (
        <div>
            <h1>Reports</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Month"
                    value={newReport.month}
                    onChange={(e) => setNewReport({ ...newReport, month: e.target.value })}
                />
                <button type="submit">Create Report</button>
            </form>

            <ul>
                {reports.map((report) => (
                    <li key={report.id}>{report.month} - Souls Won: {report.souls_won_current}</li>
                ))}
            </ul>
        </div>
    );
}

export default Report;
