# Better Weather and News

A single-page dashboard showing the top 5 Danish news headlines and the current
weather in Aarhus.

**Live demo: <https://betterdevelopers.nicotto.dk/>** — deployed on Vercel and
running on live news, so you can see it without setting anything up.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Both data sources
are fetched in Server Components, so no API key ever reaches the browser.

README.md file Setup and run + env.example made with CLAUDE.
I have used CLAUDE for idea spec, validation and debugging. Comments to be found in files is made by CLAUDE and left on purpose to show where i lack skills and needed help.

---

## CLAUDE: Setup and run

### Prerequisites

- **Node.js 20.9 or newer** (required by Next.js 16). Check with `node -v`.
- npm — ships with Node.

### Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

**That's it — no API key or `.env` file is needed to run the app.** See below
for what changes if you add one.

### Optional: live news

Weather comes from [Open-Meteo](https://open-meteo.com/), which needs no key and
always runs live.

News comes from [Newsdata.io](https://newsdata.io/), which does need a key.
**Without one the app falls back to bundled sample headlines** and shows an
"Eksempeldata" badge above the feed, so it is always obvious which you are
looking at.

To use live news:

```bash
cp .env.example .env.local
```

Then put your key in `.env.local`:

```
NEWS_API_KEY=your_key_here
```

**The key for this project is shared via [scrt.link](https://scrt.link/) in the
submission email**, as the assignment asks. If you would rather use your own, a
free key is available at <https://newsdata.io/register>.

Restart the dev server after adding the key.

`.env.local` is gitignored. Only `.env.example`, which holds no real value, is
committed — no secret appears anywhere in this repository or its history.

### Other scripts

| Command                | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Development server                             |
| `npm run build`        | Production build                               |
| `npm start`            | Serve the production build (run `build` first) |
| `npm run typecheck`    | `tsc --noEmit`                                 |
| `npm run lint`         | ESLint                                         |
| `npm run format`       | Prettier, writes changes                       |
| `npm run format:check` | Prettier, check only                           |

### Notes

- The UI is in Danish; the code, comments and server-side logs are in English.
- Both sources are cached for 15 minutes to stay within the Newsdata free-tier
  quota and to keep reloads fast.

---

## Nicolai: Assumptions and trade-offs

Assumptions:

- My approach to new tasks/issues is to get an overview of the specifications and then develop what is specified. In the mail you mentioned that the "task is relativly open" which means i get the freedom to do whatever i want with the task. Therefore, by following YAGNI and KISS convention, i have made the functionality from the specifications and then used the "open task" to style and structure the project from what makes sense and is best practice. Frontend wise i just had fun designing and styling the components and layout from Dribble mockups
- I have mixed english and danish content on the page since i fetch danish articles. Hope and assume the content is understandable.
- Search option searches from danish news, and do not client side filter the news that are displayed on first load. the query returns the five most recent matching articles, usually different ones rather than a subset of what was shown.

Trade-offs

- I chose NewsData.io since other api's (as NewsAPI.org) is free on development only and will cost at deployment. This allows me to be able to host the project without being billed for it.
- OpenMeteo did i choose because it needed no key and signup, so that the weather widget would always work and then the news key is the only secret of the project.
- The services return a Result object instead of throwing. A failed request becomes data i can render, not an exception that takes the page down. So if news is down the weather still shows. The cost is that every component using the data has to check whether it succeeded before using it.
- Search submits rather than firing after every keystroke.

## Nicolai: Time spent

Thursday after the metting: Project setup and config, removed Next boilerplate, configuration of prettier, tailwind and eslint and research/idea spec: 1,5 hours

Friday: API integrations and handling of data: 2,5 hours

Saturday: Rest of the project features (Hero sections, news section, Header with Darkmode toggle, searchParams feature for keyword search): 8 hours

Total time spent: 12 hours

I would not have made it as far as i had without using CLAUDE agent for sparring and debugging. It was very important for me to show how i would approach a task like this while still writing code myself and using tools as AI to be more effective.

## What I would improve with more time

- I would have used more time in the early stage (Maybe 1 hour extra time on researching) by finding relevant design ideas, mockups and more in-depth going research on which provider to fetch data from. I took the first and best i could find. On a project for a customer i would spend more time on this matter.
- Accessablity wise, i have made inline implementations but havent actually run a pass with lighthouse, screen reader walkthrough nor color contrast checker. This would be relevant to be more aware of how accessable the project currently is. AN obvious and easy fix on this regard is changing content in lightmode that have brand-color on white bg.
- Testing is setup in service layers with errormessage and fallback content. For future implementations when the project scale it would be relevant to make CI workflows for running format and eslint write, before pushing code to production. All four scripts already exist, so the workflow itself would be short. Right now nothing stops unformatted or broken code from being pushed
- I would add Vitest on the service layer - the two mappers, the error paths and the mock-data fallback. They are pure functions with no DOM setup, so they give the most coverage for the least work
- Update the Search feature with better informative content. The user is not aware of what they are searching through when new news is fetched on submit. The option works for searching but is not as userfriendly as it could be.
- I have it hosted on vercel, which is the zero-config path for Next.js. Vercel is the right choice for a next app this size. However, with more time I would containerise it with Docker and try to host it on a self-owned server, to get more experience with that setup.
