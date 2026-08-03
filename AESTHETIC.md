# Aesthetic Statement: 2010s Summer Nostalgia

**Selected Aesthetic:** [2010s Summer Nostalgia](https://aesthetics.fandom.com/wiki/2010s_Summer_Nostalgia)

## CSS and the Aesthetic

I wanted the site to feel like a throwback to 2016 so I built a palette around Rose Gold, Saturated Teal, and Neon Pink, which are the colors that show up everywhere in that era. The big visual move is a `linear-gradient` on the `html` element that goes from Sun Flare Gold at the top to Rose Gold at the bottom to get the effect of looking like it was shot at golden hour. I also added CSS `filter: saturate(1.4) brightness(1.1)` to the `photo-of-the-day` images to push the colors the way Instagram filters did back then. The goal was to make the photos feel like memories than images.

## JavaScript Enhancement

The `photo-of-the-day` Web Component pulls images from the Picsum API and displays them on the page. The part I wanted to get right was security because the API returns data I don't control, so I never use `innerHTML` to put it on the page. Instead I use
`setAttribute` for the image source and `textContent` for the author credit, which means even if something weird came back from the API, it couldn't execute as code. The component also tracks states (`loading`, `success`, `error`) so the user always
knows what's happening and gets a retry button if something goes wrong.

## Accessibility and Usability

I used relative units (`rem` and `ch`) instead of fixed pixels throughout the CSS. The main content is capped at `70ch`, which keeps line lengths readable no matter what font size the user has set in their browser. The theme switcher is hidden by default using the `hidden` attribute and only shown if JavaScript is working, so if JS fails, there's no broken dropdown.

## The Medium is the Message

McLuhan's idea is that the medium itself carries meaning, separate from whatever content it delivers. I think about the mid 2010s internet that way. Instagram and Tumblr were defining what "a good photo" meant at the time, they were like the guideline of 2016 pictures for everyone. The filters, the gradients, the aesthetic were the message. My site tries to do the same thing by using a Web Component that fetches a random image and styles it with those same high-saturation, high-brightness treatments, the technology is doing the aesthetic work.