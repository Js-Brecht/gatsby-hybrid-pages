import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import Layout from "../components/layout"
import Index from '../pages/index';

const UserPage = ({ userId, data }) => {
    const [userData, setUserData] = useState(data);
    const [shouldRender] = useState(() => {
        let newStaticVal = parseInt(userId, 10) === userData.userId;
        return (newVal) => {
            if (typeof newVal === 'boolean') newStaticVal = newVal;
            return newStaticVal;
        }
    });

    useEffect(() => {
        if (!shouldRender()) {
            /**
             * Check database for existing user here, otherwise fail
             */
            shouldRender(true);
            setTimeout(() => {
                setUserData({
                    id: 'blah blah blah',
                    userId: 100,
                    name: 'VOILA!!!'
                })
            }, 1000)
        }
    }, [shouldRender]);

    return (
        <Layout>
            {!shouldRender()
                ? (
                    <div>
                        This is a loading effect!!!
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(userData).map((key, idx) => (
                                    <th key={idx}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.values(userData).map((val, idx) => (
                                    <td key={idx}>{val}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                )
            }
        </Layout>
    )
}

const User = ({ data }) => {
    return (
        <Router>
            <UserPage path='/user/:userId' data={data.user} />
            <Index path="/user/" />
        </Router>
    )
}

export default User;

export const query = graphql`
    query($id: String) {
        user(id: { eq: $id }) {
            id
            userId
            name
        }
    }
`;