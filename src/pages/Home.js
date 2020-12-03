import React, { useState } from 'react'
import useFetch from "react-fetch-hook";
import styled from 'styled-components'

import Clickable from '../components/Clickable'
import Cards from '../components/Cards'

import { useRoute } from '../hooks/useRoute'
import { useFavorites } from '../hooks/useFavorites'
import { usePictureData } from '../hooks/usePictureData'

import { ReactComponent as RocketIcon } from '../assets/rocket.svg'
import { useConfirmation } from '../hooks/useConfirmation'


const Loader = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

// NASA Api using demo key
const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10'
const mockData = [
  {
    date: "2002-12-05",
    explanation: `NGC 2359 is a striking emission nebula with an impressive popular name - Thor's Helmet. Sure, its suggestive winged appearance might lead some to refer to it as the duck nebula", but if you were a nebula which name would you choose? By any name NGC 2359 is a bubble-like nebula some 30 light-years across, blown by energetic winds from an extremely hot star seen near the center and classified as a Wolf-Rayet star. Wolf-Rayet stars are rare massive blue giants which develop stellar winds with speeds of millions of kilometers per hour. Interactions with a nearby large molecular cloud are thought to have contributed to this nebula's more complex shape and curved bow-shock structures. NGC 2359 is about 15,000 light-years distant toward the constellation Canis Major.`,
    hdurl: "https://apod.nasa.gov/apod/image/0212/ngc2359_smith_full.jpg",
    media_type: "image",
    service_version: "v1",
    title: "NGC 2359: Thor's Helmet",
    url: "https://apod.nasa.gov/apod/image/0212/ngc2359_smith.jpg"
  },
  {
    date: "2008-02-09",
    explanation: `An intricate network of lighting plays across the 130 foot high Rotating Service Structure (RSS) in this dramatic night view of the Space Shuttle Atlantis on the Kennedy Space Center's launch pad 39A. Small human figures visible in silhouette emphasize the structure's enormous scale. Seen here after rolling back before Thursday's shuttle launch, the RSS provides pre-launch access to the orbiter and its payload. For this mission to the International Space Station, STS-122, Atlantis' payload is the European Space Agency's Columbus science laboratory. During the mission, three space walks are planned to attach the Columbus lab. Atlantis is expected to dock with the space station today. digg_url = 'http://apod.nasa.gov/apod/ap080209.html'; digg_skin = 'compact';`,
    hdurl: "https://apod.nasa.gov/apod/image/0802/atlantis_sts122.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Atlantis on Pad 39A",
    url: "https://apod.nasa.gov/apod/image/0802/atlantis_sts122_800.jpg"
  },
  {
    date: "2010-10-19",
    explanation: `What is that dark streak below Prometheus? Although it may look like a shadow or a trail blazed by sweeping up material, computer simulations indicate that the dark streak is better understood as an empty path pulled away by the gravity of Saturn's small moon. The particles don't follow Prometheus so much as glide sideways past where Prometheus used to be. One dark streamer is created during each pass of Prometheus through the F-ring that it shepherds. The streamers were unpredicted and first discovered in 2004 on high resolution images taken by the robotic Cassini spacecraft orbiting Saturn. Close inspection of the surface of Prometheus itself in the above image shows interesting structure and craters. The Cassini spacecraft arrived at Saturn in 2004 and, as it continues to function well, is now expected to continue to send back data and images from the distant ringed world until 2017.`,
    hdurl: "https://apod.nasa.gov/apod/image/1010/prometheusrising_cassini_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Prometheus Rising Through Saturn's F Ring",
    url: "https://apod.nasa.gov/apod/image/1010/prometheusrising_cassini.jpg"
  },
  {
    copyright: "Jean-Francois Graffand",
    date: "2017-11-25",
    explanation: `Follow this vertical panoramic view from horizon to horizon and your gaze will sweep through the zenith of a dark night sky over Pic du Midi mountaintop observatory. To make the journey above a sea of clouds, 19 single exposures were taken near the end of night on October 31 and assembled in a mercator projection that renders the two horizons flat. Begin at the top and you're looking east toward the upsidedown dome of the observatory's 1 meter telescope. It's easy to follow the plane of our Milky Way galaxy as it appears to emerge from the dome and angle down toward the far horizon. Just to its right, the sky holds a remarkable diffuse glow of zodiacal light along our Solar System's ecliptic plane. Zodiacal light and Milky Way with star clusters, cosmic dust clouds and faint nebulae, cross near the zenith. Both continue down toward the airglow in the west. They disappear near the western horizon at the bottom, beyond more Pic du Midi observatory domes and a tall communications relay antenna.`,
    hdurl: "https://apod.nasa.gov/apod/image/1711/horizon2horizonJFGraffand.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Crossing Horizons",
    url: "https://apod.nasa.gov/apod/image/1711/horizon2horizonJFGraffand.jpg"
  },
  {
    date: "2004-02-11",
    explanation: `The Sleeping Beauty galaxy may appear peaceful at first sight but it is actually tossing and turning. In an unexpected twist, recent observations have shown that the gas in the outer regions of this photogenic spiral is rotating in the opposite direction from all of the stars! Collisions between gas in the inner and outer regions are creating many hot blue stars and pink emission nebula. The above image was taken by the Hubble Space Telescope in 2001 and released last week. The fascinating internal motions of M64, also cataloged as NGC 4826, are thought to be the result of a collision between a small galaxy and a large galaxy where the resultant mix has not yet settled down.`,
    hdurl: "https://apod.nasa.gov/apod/image/0402/m64_hst_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "M64: The Sleeping Beauty Galaxy",
    url: "https://apod.nasa.gov/apod/image/0402/m64_hst.jpg"
  },
  {
    date: "1997-12-26",
    explanation: `The turbulent region West of Jupiter's Great Red Spot is highlighted in this recent picture constructed from data recorded by the Galileo spacecraft. The image is color coded to show cloud height and thickness; white clouds are high and thick, light blue clouds are high and thin, and reddish clouds are low. The edge of the Red Spot itself appears blue here (lower right) and spans about 6,600 miles along the curving limb of the planet (north is up). Westward winds, deflected north by the circulation within the Great Red Spot, collide with Eastward winds at higher latitudes and generate the roiling, turbulent structures. The largest eddies near the Northwestern edge of the Red Spot are bright, suggesting upward convection and high altitude cloud formation are taking place there.`,
    hdurl: "https://apod.nasa.gov/apod/image/9712/west_jup_gal_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "West Of The Great Red Spot",
    url: "https://apod.nasa.gov/apod/image/9712/west_jup_gal.jpg"
  },
  {
    date: "2005-03-22",
    explanation: `At about 100 meters from the cargo bay of the space shuttle Challenger, Bruce McCandless II was further out than anyone had ever been before. Guided by a Manned Maneuvering Unit (MMU), astronaut McCandless, pictured above, was floating free in space. McCandless and fellow NASA astronaut Robert Stewart were the first to experience such an "untethered space walk" during Space Shuttle mission 41-B in 1984. The MMU works by shooting jets of nitrogen and has since been used to help deploy and retrieve satellites. With a mass over 140 kilograms, an MMU is heavy on Earth, but, like everything, is weightless when drifting in orbit. The MMU was replaced with the SAFER backpack propulsion unit.`,
    hdurl: "https://apod.nasa.gov/apod/image/0503/freeflyer_nasa_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "To Fly Free in Space",
    url: "https://apod.nasa.gov/apod/image/0503/freeflyer_nasa.jpg"
  },
  {
    date: "2002-03-11",
    explanation: `The largest single-dish fully steerable radio telescope began operation in 2000 August in Green Bank, West Virginia, USA. Dedicated as the Robert C. Byrd Green Bank Telescope, the device weighs over 30 times more than the Statue of Liberty, and yet can point anywhere in the sky more precisely than one thousandth of a degree. The main dish is so large that it could house a football game, allowing it to hear even the faint murmurs of quasars located across the universe. Anyone can propose to use the Green Bank Telescope, although formal proposals are reviewed competitively. The Green Bank Telescope's large size and innovative design are allowing it to investigate radio waves emitted from comets, planets, pulsars, distant galaxies, and the distant early universe.`,
    hdurl: "https://apod.nasa.gov/apod/image/0203/greenbank_nrao_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "The 100-Meter Green Bank Radio Telescope",
    url: "https://apod.nasa.gov/apod/image/0203/greenbank_nrao.jpg"
  },
  {
    date: "1998-10-29",
    explanation: `Rehearsing for his historic flight on February 20, 1962, Mercury program astronaut John H. Glenn Jr. works in a cramped training capsule preparing for a few hours' voyage through space. Dubbed Friendship 7, his own snug spacecraft was launched by an Atlas rocket and carried Glenn three times around planet Earth at an altitude of about 120 miles, returning him safely to a "splashdown" in the Atlantic Ocean. The first American in orbit, Senator Glenn's remarkable return to space will be 36 years later as a payload specialist on the Space Shuttle Discovery mission STS-95. Discovery is a roomier craft which will carry a crew of 7 and an array of scientific payloads, such as the International Extreme Ultraviolet Hitchhiker. Scheduled for launch today at 2:00 PM Eastern Time, Discovery will orbit at an altitude of 320 miles and land after 8 days at Kennedy Space Center's shuttle landing facility. Godspeed the crew of STS-95 !`,
    hdurl: "https://apod.nasa.gov/apod/image/9810/johnglenn62_nasa_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "John Glenn: Friendship 7 To Discovery",
    url: "https://apod.nasa.gov/apod/image/9810/johnglenn62_nasa.jpg"
  },
  {
    date: "1999-10-02",
    explanation: `It's clear who is the biggest star in this binary system. Based on recent results, this artist's vision of the double star Phi Persei, 720 light years away, shows a bright, rapidly rotating massive star surrounded by a disk of gas. A small companion star orbits 100 million miles away. The bigger star is presently about 9 times more massive than the small one ... but it wasn't always this way. Ten million years ago the small companion was actually the most massive star in the system and because of its greater mass evolved into a giant star more quickly. After losing its swollen outer layers to the now massive star, all that remains is a stripped down, intensely hot core of about 1 solar mass. In another ten million years, the roles may reverse as the now massive star swells into its own giant phase returning" mass to its companion. Will these stars end their lives as white dwarfs or supernovae? Astronomers consider the ultimate fate of such mass-exchanging, interacting binary systems an open question and a challenge for present theories of stellar evolution.`,
    hdurl: "https://apod.nasa.gov/apod/image/9910/phiper_bpounds_big.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Phi Persei: Double Star",
    url: "https://apod.nasa.gov/apod/image/9910/phiper_bpounds.jpg"
  }
]

function Home() {
  // const { isLoading, data } = useFetch(apiUrl)
  //
  // if (isLoading) {
  //   return (
  //     <Loader>
  //       <RocketIcon />
  //     </Loader>
  //   )
  // } TODO
  const data = mockData

  return (
    <Cards pictures={data} />
  )
}

export default Home
