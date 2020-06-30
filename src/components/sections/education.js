import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
// import Img from "gatsby-image"
import { motion, useAnimation } from "framer-motion"

import { detectMobileAndTablet, isSSR } from "../../utils"
import { useOnScreen } from "../../hooks"
import ContentWrapper from "../../styles/ContentWrapper"
import Button from "../../styles/Button"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 6rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
  }
`

const StyledEducation = styled.div`
  display: grid;
  /* Calculate how many columns are needed, depending on education count */
  grid-template-columns: repeat(
    ${({ itemCount }) => Math.ceil(itemCount / 2)},
    15.625rem
  );
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 0 2.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  /* Workaround: https://stackoverflow.com/questions/38993170/last-margin-padding-collapsing-in-flexbox-grid-layout */
  &::after {
    content: "";
    width: ${({ itemCount }) =>
      Math.ceil(itemCount / 2) % 2 === 1 ? "17.125rem" : "2.5rem"};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 15.625rem);
    overflow: visible;
    padding: 0;
  }
  /* Show scrollbar if desktop and wrapper width > viewport width */
  @media (hover: hover) {
    &::-webkit-scrollbar {
      display: block;
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:horizontal {
      height: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 0.2rem solid white;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 8px;
    }
  }

  // properties for each box
  .education {
    width: 15.625rem;
    height: 12rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    border: 0.125rem solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    .icon {
      margin-right: 0.5rem;
      padding: 0.4rem;
    }
    .name {
      font-weight: bold;
      display: flex;
    }
    .completion {
      display: flex;
    }
  }
`

const Education = ({ content }) => {
  const { exports, frontmatter } = content[0].node
  const { shownItems, education } = exports

  const [shownEducation, setShownEducation] = useState(shownItems)

  const ref = useRef()
  const onScreen = useOnScreen(ref)

  const iControls = useAnimation()
  const bControls = useAnimation()

  useEffect(() => {
    // If mobile or tablet, show all eudcation initially
    // Otherwise eudcation.mdx will determine how many eudcation are shown
    // (isSSR) is used to prevent error during gatsby build
    if (!isSSR && detectMobileAndTablet(window.innerWidth)) {
      setShownEducation(education.length)
    }
  }, [education])

  useEffect(() => {
    const sequence = async () => {
      if (onScreen) {
        // i receives the value of the custom prop - can be used to stagger
        // the animation of each "education" element
        await iControls.start(i => ({
          opacity: 1,
          scaleY: 1,
          transition: { delay: i * 0.1 },
        }))
        await bControls.start({ opacity: 1, scaleY: 1 })
      }
    }
    sequence()
  }, [onScreen, shownEducation, iControls, bControls])

  const showMoreItems = () => setShownEducation(shownEducation + 4)

  return (
    <StyledSection id="education">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <StyledEducation itemCount={education.length} ref={ref}>
          {education
            .slice(0, shownEducation)
            .map(({ name, completion, description, icon }, key) => (
              <motion.div
                className="education"
                key={key}
                custom={key}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={iControls}
              >
                {/* <Img className="icon" fixed={icon.childImageSharp.fixed} />{" "} */}
                <p>
                  <span className="name">{`${name}:`}</span>
                  <span className="completion">{completion}</span>
                  <p>{description}</p>
                </p>
              </motion.div>
            ))}
          {shownEducation < education.length && (
            <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={bControls}>
              <Button
                onClick={() => showMoreItems()}
                type="button"
                textAlign="left"
                color="primary"
              >
                + Load more
              </Button>
            </motion.div>
          )}
        </StyledEducation>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Education.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        exports: PropTypes.shape({
          education: PropTypes.array.isRequired,
          shownItems: PropTypes.number.isRequired,
        }).isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Education
