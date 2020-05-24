import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"


const UserIndex = ({ data }) => (
    <Layout>
      <SEO title="Home" />
      {data.allUser.edges.map(({ node }, idx) => (
        <p key={idx}><Link to={`/user/${node.userId}`}>{node.name}</Link></p>
      ))}
      <p><Link to={`/user/100/`}>Test User</Link></p>
    </Layout>
)
  
export default UserIndex

export const query = graphql`
  query UserIndex {
    allUser {
      edges {
          node {
            id
            userId
            name
          }
      }
    }
  }
`
