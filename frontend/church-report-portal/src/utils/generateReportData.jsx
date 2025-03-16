    
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/reports/${id}`);
                if (!response.ok) throw new Error("Report not found");

                const data = await response.json();
                setReport(data);
            } catch (error) {
                console.error("Error fetching report:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

export const generateReportData = [
    {
        title: "Soul Winnings",
        data: [
            {
                title: "Outreach Programs",
                current: report.soul_winning.outreachProgramsCurrent,
                previous: report.soul_winning.outreachProgramsPrevious,
                variance: report.soul_winning.outreachProgramsVariance,
            },
            {
                title: "Outreach Programs",
                current: report.soul_winning.outreachProgramsCurrent,
                previous: report.soul_winning.outreachProgramsPrevious,
                variance: report.soul_winning.outreachProgramsVariance,
            },
        ],
    },
];