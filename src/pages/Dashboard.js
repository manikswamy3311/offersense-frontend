// Create Dashboard component
// Requirements:
// - Use useState and useEffect
// - Call getKPIs() when component loads
// - Store data in state
// - Show "Loading..." while fetching
// - Display:
//     impressions
//     clicks
//     conversions
//     ctr
//     conversion_rate
// - Keep UI simple (no styling needed)
import React, { useState, useEffect } from 'react';
import { getKPIs } from '../services/api';

const Dashboard = () => {
    const [kpis, setKpis] = useState(null);
    const [loading, setLoading] = useState(true);   


    useEffect(() => {
        const fetchKPIs = async () => {
            try {   
                const data = await getKPIs();
                setKpis(data);  
            }       catch (error) {
                console.error('Error fetching KPIs:', error);
            }
            setLoading(false);
        }       
        fetchKPIs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }           
    return (
        <div>
            <h1>Dashboard</h1>  
            <p>Impressions: {kpis.impressions}</p>
            <p>Clicks: {kpis.clicks}</p>
            <p>Conversions: {kpis.conversions}</p>  
            <p>CTR: {kpis.ctr}</p>
            <p>Conversion Rate: {kpis.conversion_rate}</p>
        </div>
    );
}
export default Dashboard;
