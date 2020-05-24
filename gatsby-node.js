/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions;

    const userNodes = [
        {
            id: 1,
            name: 'foo',
        },
        {
            id: 2,
            name: 'bar',
        }
    ]

    userNodes.forEach((user) => {
        const node = {
            ...user,
            id: createNodeId(`User-${user.id}`),
            userId: user.id,
            parent: null,
            children: [],
            internal: {
                type: 'User',
            }
        }
        node.internal.contentDigest = createContentDigest(node);
        createNode(node);
    })
}

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const results = await graphql(`
        query {
            allUser {
                edges {
                    node {
                        id
                        userId
                    }
                }
            }
        }
    `);

    results.data.allUser.edges.forEach(({ node }) => {
        createPage({
            path: `/user/${node.userId}`,
            component: require.resolve('./src/templates/userPage'),
            context: {
                id: node.id,
            }
        })
    });
    createPage({
        path: '/user/',
        matchPath: '/user/*',
        component: require.resolve('./src/templates/userPage'),
        context: {}
    })
}