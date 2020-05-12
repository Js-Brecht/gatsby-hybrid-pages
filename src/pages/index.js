import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {data.allUser.edges.map(({ node }, idx) => (
      <p key={idx}><Link to={`/user/${node.userId}`}>{node.name}</Link></p>
    ))}
    <p><Link to={`/user/100/`}>Test User</Link></p>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query Index {
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