import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import BlogPosts from "../components/sections/blogposts"
import About from "../components/sections/about"
import Education from "../components/sections/education"
import Projects from "../components/sections/projects"
import Contact from "../components/sections/contact"
import { splashScreen } from "../config"

const IndexPage = ({ data }) => (
  <Layout splashScreen={splashScreen}>
    <SEO title="Gee-Wey Yue | Developer Portfolio" />
    <Hero content={data.hero.edges} />
    <About content={data.about.edges} />
    <Projects content={data.projects.edges} />
    <Education content={data.education.edges} />
    {/* Articles is populated via Medium RSS Feed fetch */}
    <BlogPosts />
    <Contact content={data.contact.edges} />
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  {
    hero: allMdx(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          body
          frontmatter {
            greetings
            title
            subtitlePrefix
            subtitle
            subtitlePrefix2
            icon {
              childImageSharp {
                fluid(maxWidth: 60, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    about: allMdx(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    education: allMdx(filter: { fileAbsolutePath: { regex: "/education/" } }) {
      edges {
        node {
          exports {
            shownItems
            education {
              name
              completion
              description
              icon {
                childImageSharp {
                  fixed(width: 20, height: 20, quality: 90) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
    projects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { visible: { eq: "true" } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            category
            emoji
            external
            github
            screenshot {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            position
            buttonVisible
            buttonUrl
            buttonText
          }
        }
      }
    }
    contact: allMdx(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            name
            email
            profileImage {
              childImageSharp {
                fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
