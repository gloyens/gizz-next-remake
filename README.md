# Get Into Gizz
### Live website: https://www.get-into-gizz.com

## What is this project?
This is a website aimed at introducing people to Australian rock band King Gizzard and the Lizard Wizard. Users can navigate through different albums based on their tastes, similar to a flowchart.

Here's the [/r/KGATLW announcement thread](https://www.reddit.com/r/KGATLW/comments/wgv0fo/i_made_getintogizzcom_a_website_to_help_people/).

✨ Now band-approved!

[![King Gizzard tweet](https://imgur.com/AAEC7kP.png)](https://twitter.com/kinggizzard/status/1564378462407626752)

## Aim
My main goal for this website was to port the entire thing over to Next.js. While the pure HTML/CSS of the **[original](https://github.com/gloyens/get-into-gizz)** worked fine, it was unnecessarily difficult to update things - and with King Gizzard releasing as many albums as they do, it needs a lot of updating! Next 13 makes the process much more streamlined.

I also wanted to use this website as an opportunity to learn about the new technologies I'm using. Aside from **Next 13**, there's also:
- ⌨️ **Typescript** throughout,
- 🖼️ **WebGL** on the front page,
- 🤖 some **Frontmatter** to handle album data, and
- 🎨 the amazing **[CSS Components](https://www.css-components.net/)** dealing with the CSS.

The site runs on **Vercel**, which I used for the first time on this project.⌨️

Finally, I wanted to update the look of the website a bit. This one feels a bit more modern, and reflects King Gizzard's **[official website](https://kinggizzardandthelizardwizard.com/)** more closely.

## How it works
This website uses Next 13 with Typescript and the /app router, hosted on Vercel. 
A markdown file holds the content for each album, as well as all the data necessary to complete the page; specifically:
- 📛 **Title**
- 0️⃣ **Index** (ordered by release date)
- 🎵 **BandcampCode** - link to the album on Bandcamp
- 👉 **NextAlbums** - whichever albums the user should be directed to next

This is all accessed through Frontmatter, and makes it extremely easy to change the various paths of the flowchart.

Pages are built from traditional React components as well as with **[CSS Components](https://www.css-components.net/)**.

## Future Plans
Besides the issues below, there's a few things I want to do:
- [x] Rework the flowchart a little - the new albums especially could be better placed
- [x] Add the concisely-named new album, "PetroDragonic Apocalypse; or Dawn of Eternal Night: an Annihilation of Planet Earth and the Beginning of Merciless Damnation"
- [ ] Add all the extras that I never got around to doing on the HTML version of the site - live albums, demos etc

### Known Issues
- Random button doesn't work properly withserver components; removed for now.
- CSS is still pretty messy, and could use some refactoring
