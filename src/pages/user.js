import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import { Router } from '@reach/router';
import { UserPage } from '../templates/userPage';


const User = ({ data }) => {
    return (
        <Layout>
            <Router>
                <UserPage path='/user/:userId' data={data.user} />
            </Router>
        </Layout>
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